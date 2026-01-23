# Claude Code Usage

The bot was generated using [Claude Code](https://claude.ai/code).

## Prompt

The following prompt was used to generate the bot:

```text
Create a bot in the /bot folder that:

1. Listens for the "Winner" event on this contract:
   - Address: 0x75671200b4363a995060b56beac4b25098449d2e
   - Chain: Sepolia

2. When a Winner event is detected, automatically publishes a new riddle by calling setRiddle(string _riddle, bytes32 _answerHash)
   - The answer must be hashed with keccak256(toHex(answer)) from viem
   - Use a hardcoded array of riddles with their answers
   - Riddles should be blockchain/cryptography related

3. Stack: Node.js with viem

4. The bot's private key should come from environment variable BOT_PRIVATE_KEY
   - Don't forget to add: import "dotenv/config";

Keep it simple, single file if possible.
```

### Contract ABI (for context)

```json
[
  {
    "name": "Winner",
    "type": "event",
    "inputs": [{ "indexed": true, "name": "user", "type": "address" }]
  },
  {
    "name": "setRiddle",
    "type": "function",
    "inputs": [
      { "name": "_riddle", "type": "string" },
      { "name": "_answerHash", "type": "bytes32" }
    ],
    "stateMutability": "nonpayable"
  }
]
```
