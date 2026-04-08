// bundleManager.js - Bundle Buy & Sell Management System
// Handles coordinated buying and selling across multiple wallets
// Stores bundle states, tracks positions, and executes multi-phase trades

import fs from 'fs';

const BUNDLE_STATE_FILE = 'bundles.json';

export class BundleManager {
    constructor() {
        this.bundles = new Map(); // bundleId -> { buyPhase: {}, positions: {}, stats: {} }
        this.loadBundles();
    }

    /**
     * Create a new bundle for coordinated buy/sell operations
     * @param {string} bundleId - Unique identifier for this bundle
     * @param {string} tokenAddress - Token to trade
     * @param {number} targetWallets - Expected number of wallets to participate
     * @returns {Object} Bundle metadata
     */
    createBundle(bundleId, tokenAddress, targetWallets = 1) {
        if (this.bundles.has(bundleId)) {
            throw new Error(`Bundle \`${bundleId}\` already exists`);
        }

        const bundle = {
            id: bundleId,
            token: tokenAddress,
            createdAt: Date.now(),
            status: 'BUYING', // BUYING, WAITING, SELLING, COMPLETED, CANCELLED
            targetWallets,
            
            // Buy phase data
            buyPhase: {
                started: null,
                completed: null,
                wallets: [], // Wallets that participated
                totalBought: 0, // Total tokens bought across all wallets
                totalSOLSpent: 0,
                successCount: 0,
                failCount: 0
            },

            // Sell phase data
            sellPhase: {
                started: null,
                completed: null,
                trigger: 'MANUAL', // MANUAL, TIME, PRICE_TARGET, DELAY
                triggerValue: null,
                totalSold: 0, // Total tokens sold
                totalSOLReceived: 0,
                successCount: 0,
                failCount: 0
            },

            // Position tracking
            positions: new Map(), // walletPubkey -> { bought: amount, sold: amount, remaining: amount }

            // Configuration
            config: {
                buySlippage: 2,
                sellSlippage: 2,
                maxBuyAmount: 0.05,
                minBuyAmount: 0.01,
                autoSellPercent: 100, // 100 = sell all remaining tokens
                sellDelay: null, // ms to wait before auto-selling
                sellPriceTarget: null // Price multiplier (e.g., 1.5 = sell at 50% profit)
            }
        };

        this.bundles.set(bundleId, bundle);
        this.saveBundles();
        return bundle;
    }

    /**
     * Add a wallet to bundle buy phase and record its purchase
     */
    recordBuyForBundle(bundleId, walletPubkey, totalSpent, totalReceived) {
        const bundle = this.bundles.get(bundleId);
        if (!bundle) throw new Error(`Bundle \`${bundleId}\` not found`);

        if (!bundle.positions.has(walletPubkey)) {
            bundle.positions.set(walletPubkey, {
                bought: 0,
                sold: 0,
                remaining: 0,
                buyTxs: [],
                sellTxs: []
            });

            // Add to wallets list if not already there
            if (!bundle.buyPhase.wallets.includes(walletPubkey)) {
                bundle.buyPhase.wallets.push(walletPubkey);
            }
        }

        const pos = bundle.positions.get(walletPubkey);
        pos.bought += totalReceived;
        pos.remaining = totalReceived; // Assume no partial sells yet
        pos.buyTxs.push({
            timestamp: Date.now(),
            solSpent: totalSpent,
            tokensReceived: totalReceived
        });

        bundle.buyPhase.totalBought += totalReceived;
        bundle.buyPhase.totalSOLSpent += totalSpent;
        bundle.buyPhase.successCount++;

        if (!bundle.buyPhase.started) {
            bundle.buyPhase.started = Date.now();
        }

        this.saveBundles();
    }

    /**
     * Record a failed buy for this bundle
     */
    recordBuyFailureForBundle(bundleId) {
        const bundle = this.bundles.get(bundleId);
        if (!bundle) return;

        bundle.buyPhase.failCount++;
        this.saveBundles();
    }

    /**
     * Add a wallet to bundle sell phase and record its sale
     */
    recordSellForBundle(bundleId, walletPubkey, tokensSold, solReceived) {
        const bundle = this.bundles.get(bundleId);
        if (!bundle) throw new Error(`Bundle \`${bundleId}\` not found`);

        if (!bundle.positions.has(walletPubkey)) {
            bundle.positions.set(walletPubkey, {
                bought: 0,
                sold: 0,
                remaining: 0,
                buyTxs: [],
                sellTxs: []
            });
        }

        const pos = bundle.positions.get(walletPubkey);
        pos.sold += tokensSold;
        pos.remaining -= tokensSold;

        pos.sellTxs.push({
            timestamp: Date.now(),
            tokensSold,
            solReceived
        });

        bundle.sellPhase.totalSold += tokensSold;
        bundle.sellPhase.totalSOLReceived += solReceived;
        bundle.sellPhase.successCount++;

        if (!bundle.sellPhase.started) {
            bundle.sellPhase.started = Date.now();
        }

        this.saveBundles();
    }

    /**
     * Record a failed sell for this bundle
     */
    recordSellFailureForBundle(bundleId) {
        const bundle = this.bundles.get(bundleId);
        if (!bundle) return;

        bundle.sellPhase.failCount++;
        this.saveBundles();
    }

    /**
     * Complete the buy phase - lock bundle for selling
     */
    completeBuyPhase(bundleId) {
        const bundle = this.bundles.get(bundleId);
        if (!bundle) throw new Error(`Bundle \`${bundleId}\` not found`);

        bundle.buyPhase.completed = Date.now();
        bundle.status = 'WAITING';
        this.saveBundles();
    }

    /**
     * Start the sell phase
     */
    startSellPhase(bundleId, trigger = 'MANUAL', triggerValue = null) {
        const bundle = this.bundles.get(bundleId);
        if (!bundle) throw new Error(`Bundle \`${bundleId}\` not found`);

        bundle.status = 'SELLING';
        bundle.sellPhase.trigger = trigger;
        bundle.sellPhase.triggerValue = triggerValue;
        this.saveBundles();
    }

    /**
     * Complete the sell phase
     */
    completeSellPhase(bundleId) {
        const bundle = this.bundles.get(bundleId);
        if (!bundle) throw new Error(`Bundle \`${bundleId}\` not found`);

        bundle.sellPhase.completed = Date.now();
        bundle.status = 'COMPLETED';
        this.saveBundles();
    }

    /**
     * Cancel a bundle
     */
    cancelBundle(bundleId, reason = 'User cancelled') {
        const bundle = this.bundles.get(bundleId);
        if (!bundle) throw new Error(`Bundle \`${bundleId}\` not found`);

        bundle.status = 'CANCELLED';
        bundle.cancelledAt = Date.now();
        bundle.cancelReason = reason;
        this.saveBundles();
    }

    /**
     * Get bundle by ID
     */
    getBundle(bundleId) {
        return this.bundles.get(bundleId);
    }

    /**
     * Get all bundles with optional filtering
     */
    getAllBundles(statusFilter = null) {
        const result = [];
        for (const [, bundle] of this.bundles) {
            if (statusFilter && bundle.status !== statusFilter) continue;
            result.push({
                id: bundle.id,
                token: bundle.token,
                status: bundle.status,
                wallets: bundle.buyPhase.wallets.length,
                bought: bundle.buyPhase.totalBought,
                sold: bundle.sellPhase.totalSold,
                remaining: bundle.buyPhase.totalBought - bundle.sellPhase.totalSold,
                createdAt: bundle.createdAt
            });
        }
        return result;
    }

    /**
     * Get detailed bundle statistics
     */
    getBundleStats(bundleId) {
        const bundle = this.bundles.get(bundleId);
        if (!bundle) throw new Error(`Bundle \`${bundleId}\` not found`);

        const totalRemaining = Array.from(bundle.positions.values())
            .reduce((sum, pos) => sum + pos.remaining, 0);

        const profitLoss = bundle.sellPhase.totalSOLReceived - bundle.buyPhase.totalSOLSpent;
        const profitPercent = bundle.buyPhase.totalSOLSpent > 0 
            ? ((profitLoss / bundle.buyPhase.totalSOLSpent) * 100)
            : 0;

        return {
            bundleId,
            token: bundle.token,
            status: bundle.status,
            createdAt: new Date(bundle.createdAt).toISOString(),

            buyPhase: {
                duration: bundle.buyPhase.completed 
                    ? Math.round((bundle.buyPhase.completed - bundle.buyPhase.started) / 1000)
                    : null,
                walletCount: bundle.buyPhase.wallets.length,
                totalBought: bundle.buyPhase.totalBought,
                totalSpent: bundle.buyPhase.totalSOLSpent,
                success: bundle.buyPhase.successCount,
                failed: bundle.buyPhase.failCount
            },

            sellPhase: {
                duration: bundle.sellPhase.completed
                    ? Math.round((bundle.sellPhase.completed - bundle.sellPhase.started) / 1000)
                    : null,
                totalSold: bundle.sellPhase.totalSold,
                totalReceived: bundle.sellPhase.totalSOLReceived,
                trigger: bundle.sellPhase.trigger,
                success: bundle.sellPhase.successCount,
                failed: bundle.sellPhase.failCount
            },

            positions: {
                totalRemaining: totalRemaining,
                walletCount: bundle.positions.size,
                avgPerWallet: bundle.positions.size > 0 ? totalRemaining / bundle.positions.size : 0
            },

            profitability: {
                profitLoss,
                profitPercent: profitPercent.toFixed(2),
                roi: profitPercent.toFixed(2)
            }
        };
    }

    /**
     * Get positions for a specific bundle
     */
    getBundlePositions(bundleId) {
        const bundle = this.bundles.get(bundleId);
        if (!bundle) throw new Error(`Bundle \`${bundleId}\` not found`);

        const positions = [];
        for (const [walletKey, pos] of bundle.positions) {
            positions.push({
                wallet: walletKey.substring(0, 8) + '...' + walletKey.substring(walletKey.length - 4),
                bought: pos.bought,
                sold: pos.sold,
                remaining: pos.remaining,
                buys: pos.buyTxs.length,
                sells: pos.sellTxs.length
            });
        }

        return positions;
    }

    /**
     * Get all wallets in a bundle for selling
     */
    getBundleWalletsForSell(bundleId) {
        const bundle = this.bundles.get(bundleId);
        if (!bundle) throw new Error(`Bundle \`${bundleId}\` not found`);

        return bundle.buyPhase.wallets;
    }

    /**
     * Update bundle configuration
     */
    updateBundleConfig(bundleId, config) {
        const bundle = this.bundles.get(bundleId);
        if (!bundle) throw new Error(`Bundle \`${bundleId}\` not found`);

        Object.assign(bundle.config, config);
        this.saveBundles();
    }

    /**
     * Delete a bundle
     */
    deleteBundle(bundleId) {
        if (this.bundles.delete(bundleId)) {
            this.saveBundles();
            return true;
        }
        return false;
    }

    /**
     * Save bundles to file
     */
    saveBundles() {
        try {
            const data = {};
            for (const [id, bundle] of this.bundles) {
                data[id] = {
                    ...bundle,
                    // Convert Map to Object for serialization
                    positions: Object.fromEntries(bundle.positions)
                };
            }
            fs.writeFileSync(BUNDLE_STATE_FILE, JSON.stringify(data, null, 2));
        } catch (e) {
            console.error(`[BundleManager] Failed to save bundles: ${e.message}`);
        }
    }

    /**
     * Load bundles from file
     */
    loadBundles() {
        try {
            if (fs.existsSync(BUNDLE_STATE_FILE)) {
                const data = JSON.parse(fs.readFileSync(BUNDLE_STATE_FILE, 'utf8'));
                for (const [id, bundle] of Object.entries(data)) {
                    // Convert Object back to Map
                    const posMap = new Map(Object.entries(bundle.positions || {}));
                    bundle.positions = posMap;
                    this.bundles.set(id, bundle);
                }
            }
        } catch (e) {
            console.error(`[BundleManager] Failed to load bundles: ${e.message}`);
        }
    }

    /**
     * Get a formatted status string for a bundle
     */
    formatBundleStatus(bundleId) {
        const bundle = this.bundles.get(bundleId);
        if (!bundle) return null;

        const uptime = Math.round((Date.now() - bundle.createdAt) / 1000);
        const hours = Math.floor(uptime / 3600);
        const mins = Math.floor((uptime % 3600) / 60);
        const secs = uptime % 60;
        const uptimeStr = `${hours}h ${mins}m ${secs}s`;

        return {
            status: bundle.status,
            uptime: uptimeStr,
            wallets: bundle.buyPhase.wallets.length,
            bought: bundle.buyPhase.totalBought.toFixed(6),
            sold: bundle.sellPhase.totalSold.toFixed(6),
            remaining: (bundle.buyPhase.totalBought - bundle.sellPhase.totalSold).toFixed(6),
            profitLoss: (bundle.sellPhase.totalSOLReceived - bundle.buyPhase.totalSOLSpent).toFixed(4) + ' SOL'
        };
    }
}

export default BundleManager;
