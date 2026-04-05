# Solana Volume & Trading Bot 🤖🚀

An advanced, highly-modular Solana trading and volume generation bot controlled entirely via Telegram. 
Built for stability, efficiency, and heavy concurrent workloads, this bot features advanced Jito MEV protection, an autonomous smart-sell background watcher, automated wallet pool lifecycle management, and a robust state-machine architecture that thrives in production.

---

## 🌟 Key Features

* **📱 Telegram UI Orchestration:** Control all parameters, strategies, wallet generation, and RPC networks dynamically from an intuitive inline-keyboard menu directly inside Telegram. No need to stop/start the node process.
* **👛 Advanced Wallet Pool Manager:** Automatically generate, fund, and drain fleets of wallets. Features stealth multi-hop funding to obfuscate on-chain traces and leaves lamports specifically to preserve rent exemption.
* **⚡ Jito MEV Integration:** Send bundles safely using Jito validators to bypass the public mempool and prevent sandwich attacks.
* **🧠 Smart Sell Module:** Set intelligent stop-losses or auto-sell thresholds running transparently in the background even when running other primary volume campaigns.
* **🛡️ Bulletproof Error Handling:** Handles Solana's notoriously flaky RPC endpoints with grace. Implements exponential backoffs and retry mechanisms across node crashes, Telegram polling errors, and Solana `blockhash not found` drops.

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
   * `ADMIN_CHAT_ID`: (Highly Recommended). Pass your Telegram User ID here so only YOU can control the bot. Send a message to your bot or use @userinfobot to fetch this ID.
   * `RPC_URLS`: Pass a comma-separated list of your RPC nodes for round-robin balancing and automatic failover. 
   *(Example: `https://rpc1.com,https://rpc2.com`)*

## 🚀 Running the Bot

Run the bot using the packaged NPM script:
```bash
npm start
```

Upon successful startup, open your Telegram app and navigate to your bot.

* Type `/start` to summon the Main Menu.
* Type `id` or `whoami` to reveal your Chat ID (to place inside `.env`).

---

## 📈 Strategies Explained

The bot provides numerous highly-specialized routines for token interaction. A few core modes include:

### Core Volume & Growth
* **Standard Mode:** Generates classic deterministic volume. Funds temporary wallets, buys tokens, and sells them back in configurable cycles.
* **Maker Mode:** Personality-driven behavior simulating realistic active traders (Scalpers, Whales, Retail) utilizing random hold times, variable sizes, and Poisson time distribution to trick bubblemaps.
* **Web of Activity:** Simulates realistic network behaviors by jittering operations significantly.
* **Spam Mode:** Stress tests specific contracts with micro-buys.

### Advanced Trading & Manipulation
* **Pump & Dump:** Rapid targeted buys that hold until you trigger stealth dumps utilizing split chunks.
* **Whale Simulation:** Operates heavily-funded wallets targeting massive liquidity impact with staged exits.
* **Bull Trap:** Simulates fake breakout indicators, wait for reaction buys, then executes a hard stealth short.
* **Sniper Load:** Rapid zero-delay entries paired with staggered delayed exits to dump on newly spawned liquidity.

### Tactical Execution
* **Adv Wash Trading:** Operates circular wash environments natively with groups of multiple concurrent buyers and sellers maintaining flat net liquidity but massive volume metrics.
* **Mirror Whale:** Watches leading token holders and deterministically maps and mimics their trade velocity dynamically against the bonding curve.

---

## 💼 Operational Workflow

### 1. Generating & Managing Wallets
Before running a strategy that utilizes the **Wallet Pool**, you must:
1. Navigate to `💼 Wallet Pool` in Telegram.
2. Select **Generate Wallets** (e.g., 50 wallets).
3. The bot generates secure Keypairs and securely saves them locally into your backend (an atomic state dump).

### 2. Funding
When executing a standard strategy, the bot will automatically fund these wallets from your master key, but you may also **Pre-Fund** the pool:
* The bot checks the target funds amount.
* Supports **Direct** or **Stealth/Multi-hop** mode, automatically chaining proxy transfers between intermediate newly generated wallets rather than funding everything identically from your main address.

### 3. Draining Execution
Wallets can be reclaimed safely at any time:
1. Select `🔄 Drain Pool` mechanically or wait for a strategy to finish.
2. The bot sweeps tokens mathematically to SOL, accounts for Jito fees, leaves 0.005 SOL to fulfill Solana's native rent-exemption, and funnels everything directly back to the MASTER wallet.

## 🛟 Safety & Precautions

* **NEVER SHARE `.env`:** Your private key grants full access to the underlying funds. Keep this secure.
* **Start Small:** Use Devnet or test tokens to understand the volume and fee ratios prior to throwing aggressive whale/wash cycles onto mainnet.
* **Smart Sell:** Ensure `Smart Sell` thresholds correctly target the correct DEV wallet if running autonomous mode, as the bot monitors chain streams aggressively.

---
*Created and optimized for Solana high-frequency interaction and resilience.*
