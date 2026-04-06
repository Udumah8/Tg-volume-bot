# Solana Volume & Trading Bot 🤖🚀

An advanced, highly-modular Solana trading and volume generation bot controlled entirely via Telegram. 
Built for stability, efficiency, and heavy concurrent workloads, this bot features 19 isolated trading strategies, advanced Jito MEV protection, an autonomous smart-sell background watcher, automated wallet pool lifecycle management, and a robust state-machine architecture that thrives in production.

---

## 🌟 Key Features

* **📱 Telegram UI Orchestration:** Control all parameters, strategies, wallet generation, and RPC networks dynamically from an intuitive inline-keyboard menu directly inside Telegram. No need to stop/start the node process.
* **🔥 Ephemeral vs Persistent Wallets:** Run campaigns using the Persistent Wallet Pool (`wallets.json`) or toggle **Ephemeral Mode** to instantly spin up in-memory burner wallets that fund, trade, and drain back to your master wallet without leaving a trace.
* **🛡️ Force-Dump Safety Engine:** Features an airtight shutdown sequence. If you hit the "Stop" button in Telegram during an active run, the bot legally bypasses sleep cycles and forces a full token liquidation and SOL sweep before terminating, ensuring zero funds are stranded.
* **⚡ Jito MEV Integration:** Send batches of swaps safely using Jito validators to bypass the public mempool, execute wash trades atomically, and prevent sandwich attacks.
* **🤖 Smart Sell Module:** Set intelligent stop-losses or auto-sell thresholds running transparently in the background even when running other primary volume campaigns.

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
* **Ephemeral Mode (Burners):** Turn Pool Mode **OFF**. The bot bypasses the hard drive entirely, spinning up sterile burner keypairs in RAM. Once the cycle finishes, the funds are swept and the wallets are securely garbage collected.

### 2. Funding Pipeline
When executing a standard strategy, the bot will automatically detect empty wallets and securely bridge exactly `STATE.fundAmountPerWallet` from your Master `.env` Wallet directly to the subset of wallets needed. Supports **Direct** or **Stealth/Multi-hop** mode to obfuscate traces.

### 3. Draining safely
Wallets can be forcibly reclaimed at any time via `🔄 Drain Pool`. The bot sweeps tokens mathematically to SOL, accounts for network/Jito fees, and funnels every unspent drop directly back to the MASTER wallet.

## 🛟 Safety & Precautions

* **NEVER SHARE `.env`:** Your private key grants full access to the underlying funds. Keep this secure.
* **Start Small:** Use Devnet or test tokens to understand the volume and fee ratios prior to throwing aggressive whale/wash cycles onto mainnet.
* **Emergency Stop:** Hitting "Stop" in Telegram is fully safe and will force the bot to automatically liquidate current tokens before destroying ephemeral wallets.

---
*Created and optimized for Solana high-frequency interaction and resilience.*
