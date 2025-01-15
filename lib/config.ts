import { rainbowkitBurnerWallet } from "burner-connector";
import { http, createConfig } from "wagmi";
import { defineChain } from "viem";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";

export const metisSepolia = defineChain({
  id: 59902,
  name: "Metis Sepolia",
  nativeCurrency: { name: "sMetis", symbol: "sMETIS", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://sepolia.metisdevops.link"] },
  },
  blockExplorers: {
    default: {
      name: "Metis Sepolia Explorer",
      url: "https://sepolia-explorer.metisdevops.link/",
    },
  },
});

const wagmiConnectors = connectorsForWallets(
  [
    {
      groupName: "Supported Wallets",
      wallets: [rainbowkitBurnerWallet, injectedWallet],
    },
  ],
  {
    appName: "Metis Docs",
    projectId: process.env.WALLETCONNECT_PROJECTID || "",
  }
);

export const config = createConfig({
  chains: [metisSepolia],
  connectors: wagmiConnectors,
  ssr: true,
  transports: {
    [metisSepolia.id]: http(),
  },
  multiInjectedProviderDiscovery: false,
});
