# Onchain Riddle Game

A riddle game running entirely on-chain. Players connect their wallet, submit answers, and if they get it right, they win. A bot watches for winners and automatically posts the next riddle.

Built for Zama's DevRel challenge.

## Video Tutorial

<https://youtu.be/YC1umAx-_d8>

## Try it

- Play: <https://riddle.mar1.dev>
- Contract: [0x75671200b4363a995060b56beac4b25098449d2e](https://sepolia.etherscan.io/address/0x75671200b4363a995060b56beac4b25098449d2e) (Sepolia)

## How it works

The contract stores a riddle and the keccak256 hash of its answer (not the answer itself). When a player submits an answer, the contract hashes it and compares. If it matches, they're the winner.

The bot listens for `Winner` events. When it catches one, it picks a new riddle from its list and calls `setRiddle()` on the contract.

## Project structure

```text
├── contracts/   # Solidity smart contract (Hardhat 3)
├── frontend/    # Next.js 14 + wagmi + RainbowKit
└── bot/         # Node.js watcher that posts new riddles
```

## Setup

You'll need Node.js 18+ and a wallet with Sepolia ETH for testing.

Clone the repo and install dependencies:

```bash
git clone https://github.com/mar1/onchain-riddle-game
cd onchain-riddle-game

cd contracts && npm install
cd ../frontend && npm install
cd ../bot && npm install
```

Set up your `.env` files (check the `.env.example` in each directory), deploy the contract, then run:

```bash
# Frontend
cd frontend && npm run dev

# Bot (separate terminal)
cd bot && node index.js
```

See each subdirectory's README for more details.

## Stack

- Solidity + Hardhat 3
- Next.js 14, wagmi v2, RainbowKit, viem
- Node.js + viem for the bot
