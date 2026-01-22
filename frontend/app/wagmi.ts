import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";
import { http } from "wagmi";

export const config = getDefaultConfig({
  appName: "Onchain Riddle Game",
  projectId: process.env.WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID",
  chains: [sepolia],
  transports: {
    [sepolia.id]: http("https://1rpc.io/sepolia"),
  },
  ssr: true,
});
