# Solana Volume & Trading Bot v3.2 🤖🚀

A production-ready, enterprise-grade Solana trading and volume generation bot with complete Telegram control interface. Engineered for stability, scalability, and high-frequency operations with 19 battle-tested trading strategies, advanced Jito MEV protection, intelligent wallet management, and comprehensive error handling.

[![Node.js](https://img.shields.io/badge/Node.js-18.x%20%7C%2020.x-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Solana](https://img.shields.io/badge/Solana-Mainnet-purple.svg)](https://solana.com/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#-key-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Quick Start Guide](#-quick-start-guide)
- [Wallet Management](#-wallet-management)
- [Trading Strategies](#-trading-strategies)
- [Advanced Features](#-advanced-features)
- [Troubleshooting](#-troubleshooting)
- [Best Practices](#-best-practices)
- [FAQ](#-faq)
- [Support](#-support)

---

## Overview

This bot provides a complete solution for Solana token volume generation and trading operations. Built with production reliability in mind, it features:

- **Zero-downtime configuration** via Telegram interface
- **Atomic operations** with automatic rollback on failures
- **Intelligent retry logic** with exponential backoff
- **Multi-RPC failover** for maximum uptime
- **Comprehensive logging** with Winston
- **Graceful shutdown** with cleanup guarantees

### Architecture

```
┌─────────────────┐
│  Telegram Bot   │ ← User Interface
└────────┬────────┘
         │
┌────────▼────────┐
│  Volume Bot     │ ← Core Engine
│  (volumebot.js) │
└────────┬────────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
┌───▼───┐ ┌──▼──┐ ┌─────▼─────┐ ┌──▼───┐
│Wallet │ │Batch│ │   Jito    │ │ RPC  │
│Manager│ │Engine│ │  Bundle   │ │Failover│
└───────┘ └─────┘ └───────────┘ └──────┘
```

---

## 🌟 Key Features

### Core Capabilities

* **📱 Complete Telegram Control**
  - Intuitive inline keyboard interface
  - Real-time configuration updates
  - Live progress monitoring
  - No server restarts required

* **💼 Dual Wallet Modes**
  - **Persistent Pool**: Reusable wallets saved to disk (10,000+ supported)
  - **Ephemeral Mode**: Temporary in-memory wallets with automatic cleanup
  - Smart buffer calculation (0.002 SOL for ephemeral, 0.01 SOL for persistent)

* **🛡️ Production-Grade Reliability**
  - Atomic file operations prevent data corruption
  - Automatic backup and recovery
  - Graceful shutdown with token liquidation
  - Comprehensive error handling with detailed messages

* **⚡ Performance Optimizations**
  - Configurable batch concurrency (1-50 parallel operations)
  - Multi-RPC endpoint rotation with automatic failover
  - Intelligent retry logic skips non-retryable errors
  - Memory-efficient wallet shuffling algorithms

* **🔐 Security Features**
  - Private keys never persisted to disk (except wallet pool)
  - Admin-only access control
  - Rate limiting on commands
  - Secure session management

* **🎯 Advanced Trading**
  - 19 specialized trading strategies
  - Jito MEV protection for atomic bundles
  - Smart Sell with dev wallet integration
  - Multiple DEX support (15+ DEXs)
  - Dynamic slippage and fee calculation

## 🛠 Prerequisites

* **Node.js:** v18.x or v20.x
* **NPM:** v9+
* **A Solana RPC URL:** (e.g., Alchemy, QuickNode, Helius, or default Mainnet)
* **Telegram Bot Token:** Grab one from [@BotFather](https://t.me/BotFather) on Telegram

## ⚙️ Installation & Setup

1. **Clone & Install Dependencies**
   ```bash
   # Install required NPM modules
   npm install
   ```

2. **Configure Environment**
   Rename the provided `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

3. **Populate `.env`**
   Open `.env` in your text editor and provide the following:
   * `TELEGRAM_TOKEN`: Your bot token obtained from BotFather.
   * `PRIVKEY`: The private key of your **Master Wallet**. This is where fees and funding SOL are sourced from. Accepts Base58 Strings or JSON arrays.
   * `ADMIN_CHAT_ID`: (Highly Recommended). Pass your Telegram User ID here so only YOU can control the bot.
   * `RPC_URLS`: Pass a comma-separated list of your RPC nodes for round-robin balancing and automatic failover. 

## 🚀 Running the Bot

Run the bot using the packaged NPM script:
```bash
npm start
```

Upon successful startup, open your Telegram app and navigate to your bot.
* Type `/start` to summon the Main Menu.

---

## 📈 All 19 Strategies Explained

The bot provides numerous highly-specialized routines across 5 core algorithmic blocks:

### Core Organic Simulation
* **1. Standard Mode:** Generates classic deterministic volume. Funds temporary wallets, buys tokens, and sells them back in configurable cycles.
* **2. Maker Mode:** Personality-driven behavior simulating realistic active traders (Scalpers, Whales, Retail) utilizing random hold times.
* **3. Holder Growth:** Slowly buys and holds tiny amounts to puff up the raw count of distinct wallet holders on solscan.
* **4. Volume Boost:** Intentionally adds time padding and jitter to boost raw 24h metrics safely.

### Chart Manipulation
* **5. Chart Pattern:** Algorithmically paints visual structures (Ascending, Descending, Cup/Handle, Breakout).
* **6. Curve Pump:** Specifically calibrated to push Pump.fun's bonding curve to a defined completion percentage.
* **7. Pump & Dump:** Aggressive concentrated buys followed by stealth-chunked dumps.
* **8. Web of Activity:** Rapid, overlapping high-density trades to create chart noise.
* **9. Micro-Spam:** Relentless fraction-of-a-penny spam to stay on the "Recent" tab on UI feeds.

### Whale & Influencer Simulation
* **10. Whale Simulation:** Simulates a single massive whale buy, followed by silent segmented dumping.
* **11. Mirror Whale:** Automatically tracks and replicates what top holders do in real-time.
* **12. KOL Alpha Call:** Executes a whale buy and immediately triggers a massive swarm of tiny "retail" wallets to simulate follower FOMO.
* **13. Bull Trap:** Forces a fake technical breakout to bait human copy-traders, waits, and performs a stealth short.
* **14. Social Proof Airdrop:** Sends tiny buys to dozens of visible wallets to create blockchain "social proof".

### The TrendingMaster Suite
* **15. Viral Pump:** Escalates buy amounts mathematically across cycles to mimic explosive organic adoption.
* **16. Organic Growth:** Mimics viral community adoption with steady, randomized volume pairing.
* **17. FOMO Wave:** Blasts rapid waves of buys with engineered cooldowns.
* **18. Liquidity Ladder:** Slowly builds price floors by laddering entry points into the curve.
* **19. Wash Trading:** Forces 2 matching wallets to pass tokens back and forth instantly to generate free volume.

*(Additionally featuring utility scripts for Jito MEV Wash, Sniper Launches, and Advanced Wash Groups!)*

---

## 💼 Operational Workflow

### 1. Generating & Managing Wallets
Choose your wallet style in Telegram:
* **Pool Mode:** Generates a set of secure Keypairs and securely saves them locally into your backend (`wallets.json`). Great for campaigns you want to track or reuse.
* **Ephemeral Mode (Burners):** Turn Pool Mode **OFF**. The bot bypasses the hard drive entirely, spinning up sterile burner keypairs in RAM. Once the cycle finishes, the funds are swept and the wallets are securely garbage collected. Now hardened for multi-cycle strategies with intelligent funding multipliers.

### 2. Funding Pipeline
When executing a standard strategy, the bot will automatically detect empty wallets and securely bridge a safe amount (default **0.005 SOL**) from your Master wallet. This covers the Solana rent-exemption fee for and Associated Token Account (ATA), transaction fees, and the trade amount itself.

### 3. Draining safely
Wallets can be forcibly reclaimed at any time via `🔄 Drain Pool`. The bot performs a **Deep Sweep**, Hit exactly **0.0000 SOL** by accounting for the exact 5,000 lamport Solana transfer fee, ensuring no "dust" is left trapped in sub-wallets.

## 🛟 Safety & Precautions

* **NEVER SHARE `.env`:** Your private key grants full access to the underlying funds. Keep this secure.
* **Start Small:** Use Devnet or test tokens to understand the volume and fee ratios prior to throwing aggressive whale/wash cycles onto mainnet.
* **Emergency Stop:** Hitting "Stop" in Telegram is fully safe and will force the bot to automatically liquidate current tokens before destroying ephemeral wallets.

---
*Created and optimized for Solana high-frequency interaction and resilience.*
