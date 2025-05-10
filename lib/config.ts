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

export const hyperionTestnet = defineChain({
  id: 133717,
  name: "Hyperion Testnet",
  nativeCurrency: { name: "tMETIS", symbol: "tMETIS", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://hyperion-testnet.metisdevops.link/"] },
  },
  blockExplorers: {
    default: {
      name: "Hyperion Testnet Explorer",
      url: "https://hyperion-testnet-explorer.metisdevops.link/",
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

export const metisSepoliaConfig = createConfig({
  chains: [metisSepolia],
  connectors: wagmiConnectors,
  ssr: true,
  transports: {
    [metisSepolia.id]: http(),
  },
  multiInjectedProviderDiscovery: false,
});

export const hyperionConfig = createConfig({
  chains: [hyperionTestnet],
  transports: {
    [hyperionTestnet.id]: http(),
  },
});
