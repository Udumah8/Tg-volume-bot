# Solana Volume & Trading Bot v3.2 🤖🚀

**Enterprise-Grade Solana Trading Automation Platform with Wallet Aging & Organic Behavior**

A production-ready, institutional-quality Solana trading and volume generation bot with complete Telegram control interface. Features advanced wallet aging, seasoning system, and 19 battle-tested trading strategies with Jito MEV protection, intelligent wallet management, and comprehensive error handling.

[![Node.js](https://img.shields.io/badge/Node.js-18.x%20%7C%2020.x-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Solana](https://img.shields.io/badge/Solana-Mainnet-purple.svg)](https://solana.com/)
[![Production Ready](https://img.shields.io/badge/Status-Production%20Ready-success.svg)]()

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [System Requirements](#-system-requirements)
- [Installation Guide](#-installation-guide)
- [Configuration](#-configuration)
- [Quick Start Tutorial](#-quick-start-tutorial)
- [Wallet Management](#-wallet-management)
- [Wallet Aging & Seasoning](#-wallet-aging--seasoning)
- [Trading Strategies](#-trading-strategies)
- [Advanced Features](#-advanced-features)
- [Telegram Bot Interface](#-telegram-bot-interface)
- [Best Practices](#-best-practices)
- [Troubleshooting](#-troubleshooting)
- [Performance Tuning](#-performance-tuning)
- [Security Guidelines](#-security-guidelines)
- [FAQ](#-faq)
- [Support & Community](#-support--community)

---

## 🎯 Overview

### What is This Bot?

The Solana Volume & Trading Bot is a sophisticated, production-grade automation platform designed for professional token operations on the Solana blockchain. It provides institutional-level trading capabilities through an intuitive Telegram interface, making complex trading strategies accessible while maintaining enterprise-grade reliability and security.

### Who Should Use This?

- **Token Developers**: Generate organic-looking volume for new token launches
- **Market Makers**: Maintain liquidity and trading activity
- **Trading Teams**: Execute complex multi-wallet strategies
- **DeFi Projects**: Bootstrap initial trading activity and holder counts

### Core Philosophy

This bot is built on three fundamental principles:

1. **Reliability First**: Atomic operations, automatic recovery, and graceful error handling ensure your operations never leave funds stranded
2. **Security by Design**: Private keys are protected, operations are validated, and admin controls prevent unauthorized access
3. **Professional Grade**: Enterprise logging, health checks, and monitoring capabilities suitable for production environments

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Telegram Bot Interface                    │
│              (User Control & Real-time Monitoring)           │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                     Core Engine (volumebot.js)               │
│  • Strategy Execution  • Error Handling  • State Management  │
└──────┬────────┬──────────┬──────────┬──────────┬───────────┘
       │        │          │          │          │
   ┌───▼───┐ ┌─▼────┐ ┌───▼─────┐ ┌──▼──────┐ ┌▼────────┐
   │Wallet │ │Batch │ │  Jito   │ │   RPC   │ │ Swap    │
   │Manager│ │Engine│ │ Bundle  │ │Failover │ │Providers│
   │       │ │      │ │         │ │         │ │         │
   │10k+   │ │Smart │ │ MEV     │ │Multi-   │ │15+ DEXs │
   │Wallets│ │Retry │ │Protected│ │Endpoint │ │Supported│
   └───────┘ └──────┘ └─────────┘ └─────────┘ └─────────┘
```

### What Makes This Bot Different?

**Intelligent Automation**:
- Adaptive retry logic that learns from errors
- Dynamic fee and slippage calculation
- Smart balance management with automatic recovery

**Production Reliability**:
- Zero-downtime configuration updates
- Atomic operations with rollback capability
- Comprehensive health checks and diagnostics

**Enterprise Features**:
- Multi-RPC failover with automatic rotation
- Structured logging with Winston
- Graceful shutdown with cleanup guarantees
- Detailed error messages with actionable insights

---

## 🌟 Key Features

### 📱 Complete Telegram Control Interface

**Intuitive Menu System**:
- Clean inline keyboard navigation
- Real-time configuration updates
- Live progress monitoring with ETA
- No server restarts required
- Session management with automatic cleanup

**Admin Security**:
- Admin-only access control via `ADMIN_CHAT_ID`
- Rate limiting (500ms cooldown between commands)
- Secure session timeouts (60 seconds)
- Command validation and sanitization

### 💼 Dual Wallet Management Modes

**Persistent Wallet Pool** (`useWalletPool: true`):
- Supports 10,000+ wallets saved to disk
- Atomic file operations prevent corruption
- Automatic backup and recovery
- O(1) wallet lookup with PublicKey index
- Memory-efficient Fisher-Yates shuffling
- Reusable across multiple operations

**Ephemeral Mode** (`useWalletPool: false`):
- Temporary in-memory wallets
- Automatic cleanup after operations
- 5x less SOL buffer required (0.002 vs 0.01)
- Perfect for one-time operations
- No disk footprint
- Automatic token liquidation and SOL recovery

### 🛡️ Production-Grade Reliability

**Error Handling**:
- Comprehensive error classification (retryable vs non-retryable)
- Exponential backoff with jitter (1s → 2s → 4s → 8s)
- Detailed error messages with exact SOL requirements
- Automatic skip of non-retryable errors (saves RPC calls)
- Graceful degradation on partial failures

**Data Integrity**:
- Atomic file writes (temp file + rename pattern)
- Automatic backup creation before operations
- Recovery from corrupted files
- Save debouncing (1 second) to reduce disk I/O
- Config sanitization (private keys never persisted)

**Operational Safety**:
- Graceful shutdown with cleanup (SIGINT/SIGTERM)
- Token liquidation before wallet disposal
- Balance validation before every operation
- Health check function for system diagnostics
- Strategy locking prevents concurrent execution

### ⚡ Performance Optimizations

**Batch Operations**:
- Configurable concurrency (1-50 parallel operations)
- Worker pool pattern for efficient queue management
- Per-wallet rate limiting (100ms minimum interval)
- Throttled progress updates (every 5%)
- Non-blocking operations with setImmediate

**RPC Management**:
- Multi-endpoint rotation with automatic failover
- Intelligent retry with endpoint switching
- Rate limit detection and longer backoff (2s vs 1s)
- Connection pooling with configurable timeouts
- Exponential backoff up to 10 seconds max

**Memory Efficiency**:
- Chunked wallet generation (500 at a time)
- Memory-efficient shuffling algorithms
- Lazy loading of wallet data
- Automatic garbage collection of ephemeral wallets

### 🔐 Security Features

**Key Management**:
- Private keys never persisted to disk (except wallet pool)
- Secure key storage with base58 encoding
- Smart Sell dev wallet kept in memory only
- Temp file cleanup on errors

**Access Control**:
- Admin-only command execution
- Rate limiting on all commands
- Session timeout and cleanup
- Command validation and sanitization

**Operational Security**:
- Balance checks before every transaction
- Transaction validation before submission
- Secure random number generation
- No sensitive data in logs

### 🎯 Advanced Trading Capabilities

**19 Specialized Strategies**:
- Organic simulation (Standard, Maker, Holder Growth)
- Chart manipulation (Pattern, Curve, Pump & Dump)
- Whale simulation (Whale, Mirror, KOL Alpha)
- Trending modes (Viral, Organic, FOMO, Ladder, Wash)
- Advanced techniques (Sniper, Bull Trap, Airdrop)

**Jito MEV Protection**:
- Atomic bundle submission
- Multiple endpoint support with rotation
- Bundle status verification
- Dynamic tip estimation based on network congestion
- Automatic retry with failover

**Multi-DEX Support** (15+ DEXs):
- Pump.fun, Raydium (AMM/CLMM/CPMM/Launchpad)
- Meteora (DLMM/DAMM V1/V2/DBC)
- Orca Whirlpool
- Moonit, Heaven, Sugar, Boop.fun

**Smart Trading Features**:
- Dynamic slippage calculation (±1% variance)
- Dynamic fee calculation (±20% variance)
- Poisson timing distribution for organic behavior
- Volume curve following (time-of-day patterns)
- Personality-driven trading (Diamond, Scalper, Retail, Whale)

### 🧠 Smart Sell System

**Automatic Selling**:
- Monitors organic buys in real-time
- Sells from dev wallet or fallback wallets
- Configurable sell percentage (1-100%)
- Per-wallet cooldown to avoid detection
- Detailed transaction logging

**Configuration**:
- Dev wallet integration (private key in memory)
- Fallback to random holder wallets
- Minimum buy threshold (SOL amount)
- Maximum wallets per trigger
- Cooldown period (milliseconds)

---

## 💻 System Requirements

### Minimum Requirements

- **Operating System**: Windows 10/11, macOS 10.15+, Ubuntu 20.04+
- **Node.js**: v18.x or v20.x (LTS recommended)
- **NPM**: v9.0.0 or higher
- **RAM**: 2GB minimum, 4GB recommended
- **Disk Space**: 500MB for application + wallet storage
- **Network**: Stable internet connection (10 Mbps+)

### Recommended Setup

- **Node.js**: v20.x LTS
- **RAM**: 8GB (for large wallet pools 1000+)
- **CPU**: 4+ cores for optimal batch processing
- **SSD**: For faster wallet file operations
- **Network**: 50+ Mbps for high-frequency trading

### Required Services

1. **Solana RPC Endpoint**:
   - Free: Solana public RPC (rate limited)
   - Paid: Alchemy, QuickNode, Helius, GenesysGo
   - Recommended: Multiple endpoints for failover

2. **Telegram Bot**:
   - Create via [@BotFather](https://t.me/BotFather)
   - Free and instant setup
   - No special permissions required

3. **Solana Wallet**:
   - Master wallet with SOL for funding
   - Minimum 0.1 SOL recommended for testing
   - 1+ SOL recommended for production

---

## 📦 Installation Guide

### Step 1: Clone or Download

```bash
# Option A: Clone with Git
git clone https://github.com/yourusername/solana-volume-bot.git
cd solana-volume-bot

# Option B: Download ZIP
# Extract the ZIP file and navigate to the folder
cd solana-volume-bot
```

### Step 2: Install Dependencies

```bash
# Install all required packages
npm install

# Verify installation
npm list --depth=0
```

**Expected packages**:
- `@solana/web3.js` - Solana blockchain interaction
- `solana-swap` - SolanaTracker swap provider
- `solana-trade` - SolanaTrade swap provider (optional)
- `bs58` - Base58 encoding/decoding
- `winston` - Logging framework
- `node-telegram-bot-api` - Telegram bot interface
- `dotenv` - Environment variable management
- `axios` - HTTP client for Jito

### Step 3: Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your settings
nano .env  # or use your preferred editor
```

### Step 4: Set Up Telegram Bot

1. **Create Bot**:
   - Open Telegram and search for [@BotFather](https://t.me/BotFather)
   - Send `/newbot` command
   - Follow prompts to name your bot
   - Save the bot token provided

2. **Get Your Chat ID**:
   - Start your bot (send `/start`)
   - Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Find your `chat.id` in the JSON response
   - Or use the bot's `/id` command after first start

3. **Configure Bot**:
   - Add token to `.env` as `TELEGRAM_TOKEN`
   - Add your chat ID as `ADMIN_CHAT_ID`

### Step 5: Set Up Master Wallet

**Option A: Use Existing Wallet**:
```bash
# Export private key from Phantom/Solflare
# Add to .env as PRIVKEY (base58 format)
PRIVKEY=your_base58_private_key_here
```

**Option B: Generate New Wallet**:
```javascript
// Run this Node.js script once
const { Keypair } = require('@solana/web3.js');
const bs58 = require('bs58');

const wallet = Keypair.generate();
console.log('Public Key:', wallet.publicKey.toBase58());
console.log('Private Key:', bs58.encode(wallet.secretKey));
```

**Security Warning**: Never share your private key. Keep `.env` file secure and never commit it to version control.

### Step 6: Fund Master Wallet

```bash
# Send SOL to your master wallet public key
# Minimum amounts:
# - Testing: 0.1 SOL
# - Light usage: 0.5 SOL
# - Production: 1+ SOL
```

### Step 7: Verify Installation

```bash
# Start the bot
npm start

# You should see:
# ✅ SolanaTrade provider initialized successfully
# ✅ Master Wallet loaded: BrpS...35qV
# ✅ [WalletPool] Loaded X wallets from disk
# 💼 Wallet Manager: X wallets loaded
# 🚀 Volume Bot v3.2 started
```

---

## ⚙️ Configuration

### Environment Variables (.env)

Create a `.env` file in the root directory with these required variables:

```env
# Telegram Bot Configuration
TELEGRAM_TOKEN=your_telegram_bot_token_here
ADMIN_CHAT_ID=your_telegram_chat_id_here

# Solana Configuration
PRIVKEY=your_master_wallet_private_key_base58
RPC_URLS=https://api.mainnet-beta.solana.com

# Optional: Multiple RPC endpoints for failover (comma-separated)
# RPC_URLS=https://api.mainnet-beta.solana.com,https://rpc.ankr.com/solana,https://solana-api.projectserum.com

# Optional: Jito Configuration (for MEV protection)
# JITO_TIP_AMOUNT=0.0001
# JITO_ENDPOINTS=https://mainnet.block-engine.jito.wtf,https://amsterdam.mainnet.block-engine.jito.wtf

# Optional: Logging
# LOG_LEVEL=info
```

### Configuration File (config.json)

The bot uses `config.json` for operational settings. All settings can be modified through the Telegram interface without editing this file directly.

**Key Configuration Options**:

```json
{
  "useWalletPool": true,
  "minBuyAmount": 0.001,
  "maxBuyAmount": 0.01,
  "minSellPercentage": 80,
  "maxSellPercentage": 100,
  "fundAmountPerWallet": 0.005,
  "batchConcurrency": 10,
  "intervalBetweenActions": 5000,
  "useJito": false,
  "stealthMode": 1
}
```

**Configuration Parameters Explained**:

| Parameter | Description | Default | Range |
|-----------|-------------|---------|-------|
| `useWalletPool` | Use persistent wallets (true) or ephemeral (false) | `true` | boolean |
| `minBuyAmount` | Minimum SOL to spend per buy | `0.001` | 0.0001-1.0 |
| `maxBuyAmount` | Maximum SOL to spend per buy | `0.01` | 0.001-10.0 |
| `minSellPercentage` | Minimum % of tokens to sell | `80` | 1-100 |
| `maxSellPercentage` | Maximum % of tokens to sell | `100` | 1-100 |
| `fundAmountPerWallet` | SOL to fund each wallet | `0.005` | 0.002-1.0 |
| `batchConcurrency` | Parallel operations | `10` | 1-50 |
| `intervalBetweenActions` | Delay between actions (ms) | `5000` | 100-60000 |
| `useJito` | Enable Jito MEV protection | `false` | boolean |
| `stealthMode` | Stealth level (0=off, 1-3) | `1` | 0-3 |

**Wallet Pool vs Ephemeral Mode**:

- **Wallet Pool (useWalletPool: true)**:
  - Wallets saved to `wallets.json`
  - Reusable across operations
  - Supports wallet aging system
  - Requires 0.01 SOL buffer per wallet
  - Best for: Long-term campaigns, holder growth

- **Ephemeral Mode (useWalletPool: false)**:
  - Temporary in-memory wallets
  - Auto-cleanup after operations
  - Requires only 0.002 SOL buffer (5x less)
  - Best for: One-time volume, testing

---

## 🚀 Quick Start Tutorial

### Step 1: Initial Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
nano .env  # Add your credentials

# 3. Start the bot
npm start
```

### Step 2: Open Telegram

1. Open Telegram and find your bot
2. Send `/start` to initialize
3. You'll see the main menu with options

### Step 3: Configure Basic Settings

```
Main Menu → ⚙️ Settings → Basic Settings
```

Set these for your first run:
- Token Address: Your target token's mint address
- Wallet Count: Start with 10 wallets
- Fund Amount: 0.005 SOL per wallet
- Buy Amount: 0.001-0.005 SOL range

### Step 4: Generate Wallets

```
Main Menu → 💼 Wallet Management → Generate Wallets
```

- Enter number of wallets (start with 10)
- Bot generates and saves wallets
- Displays wallet addresses

### Step 5: Run Your First Strategy

```
Main Menu → 🎯 Strategies → Standard Volume
```

- Select "Standard Volume" strategy
- Confirm settings
- Bot will:
  1. Fund wallets from master wallet
  2. Execute buy transactions
  3. Wait configured interval
  4. Execute sell transactions
  5. Return SOL to master wallet

### Step 6: Monitor Progress

The bot sends real-time updates:
- Funding progress
- Buy/sell execution
- Success/failure rates
- Final statistics

### Step 7: Drain Wallets (Optional)

```
Main Menu → 💼 Wallet Management → Drain Pool
```

- Recovers all SOL from wallets
- Returns to master wallet
- Leaves exactly 0 SOL in each wallet

---

## 💼 Wallet Management

### Generating Wallets

**Via Telegram**:
```
💼 Wallet Management → Generate Wallets → Enter count
```

**Recommendations**:
- Small campaigns: 10-50 wallets
- Medium campaigns: 50-200 wallets
- Large campaigns: 200-1000 wallets
- Maximum: 10,000 wallets

### Wallet Pool Operations

**View Wallet Info**:
```
💼 Wallet Management → View Wallets
```
Shows: Total count, addresses, balances

**Drain Wallets**:
```
💼 Wallet Management → Drain Pool
```
- Recovers all SOL from wallets
- Accounts for exact 5,000 lamport fee
- Returns to master wallet

**Clear Wallets**:
```
💼 Wallet Management → Clear Pool
```
- Deletes all wallets from disk
- Use before generating fresh set
- Cannot be undone

### Funding Strategies

**Automatic Funding**:
- Bot automatically funds wallets before trading
- Calculates exact amount needed
- Includes: trade amount + fees + rent + buffer

**Manual Funding**:
- Use "Fund Wallets" option
- Specify amount per wallet
- Useful for pre-funding campaigns

**SOL Requirements**:
```
Per Wallet = Buy Amount + Slippage + Fee + Rent + Buffer
Example: 0.005 + 0.0001 + 0.0001 + 0.002 + 0.002 = 0.0092 SOL
```

### Wallet Aging System

The bot automatically tracks wallet age and behavior:

**Age Tiers**:
- 🆕 Fresh (0-1 day): 60% amounts, 180% delays
- 🌱 Young (1-7 days): 75% amounts, 140% delays
- 🌿 Seasoned (7-30 days): 90% amounts, 110% delays
- 🌳 Mature (30-90 days): 100% amounts, 100% delays
- 🏆 Veteran (90+ days): 120% amounts, 80% delays

**Benefits**:
- More organic-looking activity
- Reduced detection risk
- Better long-term sustainability
- Natural market depth

**View Aging Stats**:
```
💼 Wallet Management → Aging Statistics
```

---

## 🎯 Trading Strategies

### Strategy Categories

The bot provides 19 specialized strategies across 5 categories:

### 1. Core Organic Simulation

**Standard Volume**:
- Classic volume generation
- Configurable buy/sell cycles
- Predictable, reliable results
- Best for: Consistent volume

**Market Maker**:
- Personality-driven trading
- Simulates real traders (Scalper, Whale, Retail)
- Random hold times
- Best for: Organic-looking activity

**Holder Growth**:
- Accumulates tokens across wallets
- Increases holder count
- Small amounts per wallet
- Best for: Boosting holder metrics

**Volume Boost**:
- Adds timing jitter
- Boosts 24h volume metrics
- Organic delay patterns
- Best for: Volume milestones

### 2. Chart Manipulation

**Chart Pattern**:
- Paints technical patterns
- Options: Ascending, Descending, Cup & Handle, Breakout
- Algorithmic price action
- Best for: Creating chart signals

**Curve Pump**:
- Pushes Pump.fun bonding curve
- Target completion percentage
- Calibrated buy amounts
- Best for: Pump.fun launches

**Pump & Dump**:
- Aggressive concentrated buys
- Stealth-chunked sells
- Maximum price impact
- Best for: Short-term pumps

**Web of Activity**:
- High-density overlapping trades
- Creates chart noise
- Rapid execution
- Best for: Activity spikes

**Micro Spam**:
- Tiny frequent transactions
- Stays on "Recent" feeds
- Minimal cost
- Best for: Visibility

### 3. Whale & Influencer Simulation

**Whale Simulation**:
- Single massive buy
- Segmented stealth sells
- Simulates whale behavior
- Best for: Whale FOMO

**Mirror Whale**:
- Tracks top holders
- Replicates their trades
- Real-time monitoring
- Best for: Following whales

**KOL Alpha Call**:
- Whale buy + retail swarm
- Simulates influencer call
- Massive follower FOMO
- Best for: Launch hype

**Bull Trap**:
- Fake technical breakout
- Baits copy-traders
- Stealth reversal
- Best for: Advanced manipulation

**Social Proof Airdrop**:
- Tiny buys to many wallets
- Creates blockchain proof
- Visible holder activity
- Best for: Social signals

### 4. Trending Master Suite

**Viral Pump**:
- Escalating buy amounts
- Mimics explosive adoption
- Mathematical progression
- Best for: Viral momentum

**Organic Growth**:
- Steady randomized volume
- Community adoption simulation
- Natural progression
- Best for: Sustainable growth

**FOMO Wave**:
- Rapid buy waves
- Engineered cooldowns
- Panic buying simulation
- Best for: FOMO triggers

**Liquidity Ladder**:
- Laddered entry points
- Builds price floors
- Gradual accumulation
- Best for: Support levels

**Wash Trading**:
- Matching wallet pairs
- Token pass-through
- Zero-cost volume
- Best for: Free volume

### Strategy Selection Guide

| Goal | Recommended Strategy | Wallet Count | Duration |
|------|---------------------|--------------|----------|
| Consistent volume | Standard Volume | 20-50 | Continuous |
| Organic activity | Market Maker | 30-100 | Long-term |
| Holder count | Holder Growth | 50-200 | Gradual |
| Chart pattern | Chart Pattern | 20-50 | 1-4 hours |
| Pump.fun launch | Curve Pump | 30-100 | 30-60 min |
| Quick pump | Pump & Dump | 20-50 | 15-30 min |
| Whale FOMO | Whale Simulation | 10-30 | 1-2 hours |
| Viral momentum | Viral Pump | 50-150 | 2-6 hours |
| Free volume | Wash Trading | 10-20 | Continuous |

---

## 📈 All 19 Strategies Explained

### Core Organic Simulation
1. **Standard Mode**: Classic deterministic volume with configurable buy/sell cycles
2. **Maker Mode**: Personality-driven behavior simulating realistic traders (Scalpers, Whales, Retail)
3. **Holder Growth**: Accumulates tiny amounts to increase distinct holder count
4. **Volume Boost**: Adds timing jitter to boost 24h volume metrics safely

### Chart Manipulation
5. **Chart Pattern**: Paints visual structures (Ascending, Descending, Cup/Handle, Breakout)
6. **Curve Pump**: Pushes Pump.fun bonding curve to target completion percentage
7. **Pump & Dump**: Aggressive concentrated buys followed by stealth-chunked dumps
8. **Web of Activity**: Rapid overlapping high-density trades creating chart noise
9. **Micro-Spam**: Relentless micro-transactions to stay on "Recent" feeds

### Whale & Influencer Simulation
10. **Whale Simulation**: Single massive whale buy followed by segmented dumping
11. **Mirror Whale**: Tracks and replicates top holder trades in real-time
12. **KOL Alpha Call**: Whale buy + retail swarm simulating influencer FOMO
13. **Bull Trap**: Fake technical breakout to bait copy-traders
14. **Social Proof Airdrop**: Tiny buys to many wallets for blockchain social proof

### The TrendingMaster Suite
15. **Viral Pump**: Escalating buy amounts mimicking explosive organic adoption
16. **Organic Growth**: Steady randomized volume simulating community adoption
17. **FOMO Wave**: Rapid buy waves with engineered cooldowns
18. **Liquidity Ladder**: Laddered entry points building price floors
19. **Wash Trading**: Matching wallets passing tokens for zero-cost volume

---

## 🤖 Telegram Bot Interface

### Main Menu Structure

```
🏠 Main Menu
├── 🎯 Strategies (19 trading strategies)
├── ⚙️ Settings (configuration)
├── 💼 Wallet Management (generate, drain, view)
├── 📊 Status (current operation info)
├── 🛑 Stop (emergency stop)
└── ℹ️ Help (command reference)
```

### Command Reference

| Command | Description | Usage |
|---------|-------------|-------|
| `/start` | Initialize bot and show main menu | Send anytime |
| `/stop` | Emergency stop current operation | During execution |
| `/status` | View current operation status | Anytime |
| `/health` | Run system health check | Before operations |
| `/wallets` | View wallet pool info | Anytime |
| `/config` | View current configuration | Anytime |
| `/help` | Show command reference | Anytime |

### Settings Menu

**Basic Settings**:
- Token Address: Target token mint address
- Wallet Count: Number of wallets to use
- Fund Amount: SOL per wallet
- Buy Amount Range: Min/max SOL per buy
- Sell Percentage: How much to sell (%)

**Advanced Settings**:
- Batch Concurrency: Parallel operations (1-50)
- Interval Between Actions: Delay in milliseconds
- Stealth Mode: Level 0-3
- Jito MEV: Enable/disable
- Wallet Pool Mode: Persistent vs Ephemeral

**Smart Sell Settings**:
- Enable/Disable: Toggle smart sell
- Dev Wallet: Private key for selling
- Sell Percentage: Amount to sell (1-100%)
- Min Buy Threshold: Minimum SOL to trigger
- Cooldown: Delay between sells

### Real-Time Monitoring

The bot provides live updates during operations:

**Progress Updates**:
```
🚀 Starting Standard Volume...
💰 Funding 50 wallets... (25/50) 50%
🛒 Executing buys... (40/50) 80%
💤 Waiting 5 seconds...
💸 Executing sells... (48/50) 96%
✅ Complete! Success: 48/50 (96%)
```

**Statistics**:
- Total wallets processed
- Success/failure counts
- Total volume generated
- SOL spent/recovered
- Execution time

**Error Reporting**:
- Detailed error messages
- Actionable recommendations
- Affected wallet addresses
- Retry suggestions

### Session Management

**Session Timeout**: 60 seconds of inactivity
**Rate Limiting**: 500ms cooldown between commands
**Admin Control**: Only configured admin can execute commands

---

## 🎓 Best Practices

### Starting Out

1. **Test on Devnet First**:
```env
# Use devnet RPC for testing
RPC_URLS=https://api.devnet.solana.com
```

2. **Start with Small Amounts**:
- 5-10 wallets
- 0.001-0.005 SOL per trade
- 1-2 cycles only

3. **Monitor Closely**:
- Watch Telegram updates
- Check transaction confirmations
- Review error messages

### Scaling Up

1. **Gradual Increase**:
- Double wallet count each run
- Increase amounts slowly
- Test new strategies individually

2. **Optimize Settings**:
- Adjust concurrency based on RPC performance
- Fine-tune delays for organic appearance
- Use stealth mode for larger operations

3. **Use Multiple RPC Endpoints**:
```env
RPC_URLS=https://api.mainnet-beta.solana.com,https://rpc.ankr.com/solana,https://solana-api.projectserum.com
```

### Production Operations

1. **Pre-Operation Checklist**:
- [ ] Run health check (`/health`)
- [ ] Verify master wallet balance
- [ ] Confirm token address is correct
- [ ] Review wallet pool size
- [ ] Check RPC connectivity

2. **During Operation**:
- [ ] Monitor success rates
- [ ] Watch for RPC errors
- [ ] Track transaction confirmations
- [ ] Review error patterns

3. **Post-Operation**:
- [ ] Verify all wallets drained
- [ ] Check final balances
- [ ] Review operation statistics
- [ ] Archive logs

### Security Best Practices

1. **Private Key Management**:
- Never share `.env` file
- Use separate master wallet for bot
- Keep backup of private keys offline
- Rotate keys periodically

2. **Access Control**:
- Set correct `ADMIN_CHAT_ID`
- Don't share bot token
- Monitor bot activity
- Use rate limiting

3. **Operational Security**:
- Start with small test amounts
- Use devnet for testing
- Monitor for unusual activity
- Keep logs for auditing

### Performance Optimization

**For Speed**:
```json
{
  "batchConcurrency": 30,
  "intervalBetweenActions": 1000,
  "useJito": true
}
```

**For Reliability**:
```json
{
  "batchConcurrency": 10,
  "intervalBetweenActions": 5000,
  "useJito": false
}
```

**For Stealth**:
```json
{
  "batchConcurrency": 5,
  "intervalBetweenActions": 10000,
  "stealthMode": 3
}
```

### Wallet Aging Best Practices

1. **Season New Wallets**:
```
💼 Wallet Management → Season Wallets
```
- Build organic history before heavy use
- Reduces detection risk
- Increases wallet value

2. **Use Optimal Mix**:
- Bot automatically selects age-optimized wallets
- Balances fresh and veteran wallets
- Creates natural market depth

3. **Monitor Age Distribution**:
```
💼 Wallet Management → Aging Statistics
```
- Ensure good age distribution
- Avoid too many fresh wallets
- Track trust scores

---

## 🔧 Troubleshooting

### Common Issues

**Issue: "Insufficient SOL" errors**

**Symptoms**: Bot aborts with insufficient funds message

**Solutions**:
1. Check detailed error message for exact requirements
2. Fund master wallet with more SOL
3. Reduce `minBuyAmount` in config
4. Use ephemeral mode (requires 5x less buffer)

**Example Error**:
```
Insufficient SOL: 0.005 < 0.012 needed
(buy: 0.01, slippage: 0.0002, fee: 0.0005, rent: 0.002)
```

**Issue: RPC rate limiting**

**Symptoms**: Frequent timeout errors, slow execution

**Solutions**:
1. Add multiple RPC endpoints in `.env`
2. Reduce `batchConcurrency` to 5-10
3. Increase `intervalBetweenActions`
4. Use paid RPC service (Helius, QuickNode)

**Issue: Wallet file corruption**

**Symptoms**: Bot fails to load wallets, JSON parse errors

**Solutions**:
1. Check `wallets.backup.json` exists
2. Copy backup to `wallets.json`
3. Restart bot
4. If backup missing, regenerate wallets

**Issue: Transactions failing**

**Symptoms**: High failure rate, "Transaction simulation failed"

**Solutions**:
1. Verify token address is correct
2. Check token has sufficient liquidity
3. Increase slippage tolerance
4. Reduce buy amounts
5. Check if token is tradeable

**Issue: Bot not responding**

**Symptoms**: No response to Telegram commands

**Solutions**:
1. Check bot is running (`npm start`)
2. Verify `TELEGRAM_TOKEN` is correct
3. Confirm `ADMIN_CHAT_ID` matches your chat ID
4. Check bot logs for errors
5. Restart bot

**Issue: Slow execution**

**Symptoms**: Operations take too long

**Solutions**:
1. Increase `batchConcurrency` (10-30)
2. Use faster RPC endpoint
3. Reduce `intervalBetweenActions`
4. Enable Jito for faster confirmations
5. Use fewer wallets per cycle

### Health Check

Run health check before operations:

```
/health command in Telegram
```

**Checks**:
- ✅ Master wallet loaded
- ✅ RPC connectivity
- ✅ Wallet pool status
- ✅ Configuration validity
- ✅ Telegram bot connection

**Example Output**:
```
🏥 System Health Check

✅ Master Wallet: BrpS...35qV (0.5 SOL)
✅ RPC: Connected (150ms latency)
✅ Wallet Pool: 100 wallets loaded
✅ Config: Valid
✅ Telegram: Connected

Status: HEALTHY ✅
```

### Error Message Guide

**"Insufficient SOL"**: Need more SOL in master wallet or reduce amounts

**"Rate limit exceeded"**: Too many RPC requests, reduce concurrency

**"Transaction simulation failed"**: Token not tradeable or insufficient liquidity

**"Slippage tolerance exceeded"**: Price moved too much, increase slippage

**"Blockhash not found"**: RPC issue, retry or switch endpoint

**"Account not found"**: Token account doesn't exist, will be created automatically

### Debug Mode

Enable detailed logging:

```env
# Add to .env
LOG_LEVEL=debug
```

**Log Locations**:
- Console output: Real-time logs
- `bot.log`: All logs
- `logs/combined.log`: Structured logs
- `logs/error.log`: Errors only

### Getting Help

1. **Check Documentation**:
   - This README
   - `WALLET_AGING_GUIDE.md`
   - `QUICK_REFERENCE.md`

2. **Review Logs**:
   - Check `bot.log` for errors
   - Look for patterns in failures
   - Note exact error messages

3. **Run Diagnostics**:
   - Use `/health` command
   - Check wallet balances
   - Verify RPC connectivity

4. **Test Incrementally**:
   - Start with 1 wallet
   - Use devnet first
   - Increase gradually

---

## 📊 Performance Tuning

### RPC Configuration

**Free RPC (Public)**:
```json
{
  "batchConcurrency": 5,
  "intervalBetweenActions": 10000
}
```

**Paid RPC (Helius/QuickNode)**:
```json
{
  "batchConcurrency": 30,
  "intervalBetweenActions": 1000
}
```

**Multiple Endpoints**:
```env
RPC_URLS=https://api.mainnet-beta.solana.com,https://rpc.ankr.com/solana,https://solana-api.projectserum.com
```

### Concurrency Optimization

| Wallet Count | Recommended Concurrency | Expected Duration |
|--------------|------------------------|-------------------|
| 10-20 | 5 | 30-60 seconds |
| 20-50 | 10 | 1-2 minutes |
| 50-100 | 15 | 2-5 minutes |
| 100-200 | 20 | 5-10 minutes |
| 200-500 | 25 | 10-20 minutes |
| 500+ | 30 | 20+ minutes |

### Memory Usage

**Small Operations** (< 100 wallets):
- RAM: 500MB-1GB
- Disk: 50MB

**Medium Operations** (100-1000 wallets):
- RAM: 1-2GB
- Disk: 100-500MB

**Large Operations** (1000+ wallets):
- RAM: 2-4GB
- Disk: 500MB-1GB

### Network Optimization

**Bandwidth Requirements**:
- Minimum: 10 Mbps
- Recommended: 50+ Mbps
- Large operations: 100+ Mbps

**Latency**:
- RPC latency: < 200ms ideal
- Transaction confirmation: 400-800ms
- Total operation time: Varies by size

---

## 🔒 Security Guidelines

### Private Key Security

**DO**:
- ✅ Keep `.env` file secure
- ✅ Use separate wallet for bot operations
- ✅ Backup private keys offline
- ✅ Rotate keys periodically
- ✅ Use hardware wallet for large amounts

**DON'T**:
- ❌ Share `.env` file
- ❌ Commit `.env` to version control
- ❌ Use main wallet for bot
- ❌ Store keys in plain text elsewhere
- ❌ Share private keys with anyone

### Access Control

**Telegram Security**:
- Set correct `ADMIN_CHAT_ID`
- Don't share bot token
- Monitor bot activity
- Use rate limiting (built-in)

**File Permissions**:
```bash
# Secure .env file
chmod 600 .env

# Secure wallet files
chmod 600 wallets.json
chmod 600 wallets.metadata.json
```

### Operational Security

**Testing**:
- Always test on devnet first
- Start with small amounts
- Verify token addresses
- Check transaction confirmations

**Monitoring**:
- Review logs regularly
- Monitor wallet balances
- Track success rates
- Watch for anomalies

**Backup**:
- Backup `wallets.json` regularly
- Keep `wallets.backup.json` safe
- Archive logs periodically
- Document configurations

---

## ❓ FAQ

**Q: How much SOL do I need to start?**

A: Minimum 0.1 SOL for testing, 1+ SOL recommended for production. Calculate: `(wallets × fundAmount) + buffer`

**Q: Can I use this on devnet?**

A: Yes! Change `RPC_URLS` to devnet endpoint in `.env`

**Q: What's the difference between wallet pool and ephemeral mode?**

A: Pool mode saves wallets to disk (reusable), ephemeral creates temporary wallets (auto-cleanup)

**Q: How do I stop a running operation?**

A: Send `/stop` command in Telegram or press Ctrl+C in terminal

**Q: Will tokens be sold back to SOL?**

A: Yes, most strategies sell tokens back. Only HOLDER_GROWTH keeps tokens.

**Q: How many wallets can I use?**

A: Up to 10,000 wallets supported. Start with 10-50 for testing.

**Q: What's the wallet aging system?**

A: Automatic system that tracks wallet age and behavior to create organic-looking activity

**Q: Can I run multiple strategies simultaneously?**

A: No, only one strategy at a time to prevent conflicts

**Q: How do I update configuration?**

A: Use Telegram settings menu or edit `config.json` (requires restart)

**Q: What if my wallets get corrupted?**

A: Restore from `wallets.backup.json` - automatic backups are created

**Q: How do I know if my RPC is working?**

A: Run `/health` command to check RPC connectivity

**Q: Can I use this for any Solana token?**

A: Yes, any SPL token with liquidity on supported DEXs

**Q: What's Jito MEV protection?**

A: Bundles transactions atomically to prevent front-running

**Q: How do I season wallets?**

A: Use "Season Wallets" option in Wallet Management menu

**Q: What's the best strategy for my use case?**

A: See "Strategy Selection Guide" section above

---

## 📚 Additional Resources

### Documentation Files

- **WALLET_AGING_GUIDE.md**: Complete guide to wallet aging system
- **QUICK_REFERENCE.md**: Quick reference for common operations
- **IMPROVEMENTS_SUMMARY.md**: Overview of all improvements
- **TOKEN_HANDLING_EPHEMERAL_MODE.md**: Token behavior guide

### Configuration Examples

**High Volume**:
```json
{
  "useWalletPool": true,
  "minBuyAmount": 0.01,
  "maxBuyAmount": 0.05,
  "batchConcurrency": 30,
  "intervalBetweenActions": 2000
}
```

**Stealth Mode**:
```json
{
  "useWalletPool": true,
  "minBuyAmount": 0.001,
  "maxBuyAmount": 0.005,
  "batchConcurrency": 5,
  "intervalBetweenActions": 15000,
  "stealthMode": 3
}
```

**Holder Growth**:
```json
{
  "useWalletPool": true,
  "minBuyAmount": 0.0001,
  "maxBuyAmount": 0.001,
  "minSellPercentage": 0,
  "maxSellPercentage": 0,
  "batchConcurrency": 10
}
```

### Command Line Tools

```bash
# View logs in real-time
tail -f bot.log

# Check wallet count
grep -c "publicKey" wallets.json

# Monitor system resources
watch -n 1 'ps aux | grep node'

# Backup wallets
cp wallets.json wallets.backup.$(date +%Y%m%d).json
```

---

## 🤝 Support & Community

### Getting Support

1. **Documentation**: Read this README and related docs
2. **Health Check**: Run `/health` command
3. **Logs**: Check `bot.log` for detailed errors
4. **Testing**: Test on devnet first

### Contributing

Contributions welcome! Areas for improvement:
- Additional trading strategies
- Performance optimizations
- Documentation improvements
- Bug fixes and testing

### License

MIT License - See LICENSE file for details

---

## 🎯 Summary

This bot provides enterprise-grade Solana trading automation with:

✅ **19 specialized strategies** for every use case
✅ **Wallet aging system** for organic behavior
✅ **Complete Telegram control** with real-time monitoring
✅ **Production-grade reliability** with atomic operations
✅ **Comprehensive error handling** with detailed messages
✅ **Flexible configuration** via Telegram or config files
✅ **Security-first design** with private key protection
✅ **Performance optimized** for high-volume operations

**Start small, test thoroughly, and scale gradually for best results!**

---

*Created and optimized for Solana high-frequency trading with enterprise reliability and organic behavior simulation.*
