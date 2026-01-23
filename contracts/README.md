# Contracts

The smart contract that runs the riddle game. Pretty minimal: it just stores a riddle (and its status), checks answers, and emits events.

## Setup

```bash
npm install
```

## Deploy

```bash
export SEPOLIA_RPC_URL="https://..."
export SEPOLIA_PRIVATE_KEY="0x..."

npx hardhat run scripts/deploy.ts --network sepolia
```

The deploy script also sets the first riddle automatically. Copy the contract address, you'll need it for the frontend and bot.

## Test locally

```bash
npx hardhat test
```

## Contract

**Functions:**

- `setRiddle(string, bytes32)` — Only the bot can call this. Sets a new riddle with the hashed answer.
- `submitAnswer(string)` — Anyone can try. If keccak256 of your answer matches the stored hash, you win.

**Events:**

- `RiddleSet` — New riddle posted
- `AnswerAttempt` — Someone submitted an answer (includes whether it was correct)
- `Winner` — Riddle solved

The wallet that deploys the contract becomes the bot, the only address allowed to set new riddles.
