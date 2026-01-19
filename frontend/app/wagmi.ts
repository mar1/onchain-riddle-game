import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Onchain Riddle Game",
  projectId: process.env.WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID",
  chains: [sepolia],
  ssr: true,
});
