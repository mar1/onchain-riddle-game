# Frontend

The web app where players read riddles and submit their answers.

Uses wagmi hooks to read from the contract and send transactions. RainbowKit handles all the wallet connection logic.

## Run locally

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>

## Stack

- Next.js 14 with App Router
- wagmi v2 + viem for blockchain interactions
- RainbowKit for the connect button
- Tailwind for styling

## Environment variables

Optional for production:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=xxx
```

Get a WalletConnect project ID at <https://dashboard.reown.com/>

The contract address is hardcoded in `app/abi/OnchainRiddle.ts`. Update it there if you deploy your own contract.

## Deployment

Push to main and Vercel handles the rest. No config needed.
