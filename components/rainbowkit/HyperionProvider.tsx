"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { hyperionConfig } from "@/lib/config";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

const Web3Provider = ({ children }: Props) => {
  return (
    <WagmiProvider config={hyperionConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
export default Web3Provider;
