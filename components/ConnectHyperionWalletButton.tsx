"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const HYPERION_PARAMS = {
  chainId: "0x20A55", // 133717 in hex
  chainName: "Hyperion Testnet",
  nativeCurrency: {
    name: "Hyperion Testnet Metis",
    symbol: "tMETIS",
    decimals: 18,
  },
  rpcUrls: ["https://hyperion-testnet.metisdevops.link/"],
  blockExplorerUrls: ["https://hyperion-testnet-explorer.metisdevops.link/"],
};

export const ConnectHyperionWalletButton: React.FC = () => {
  const [status, setStatus] = useState<string>("");

  const handleClick = async () => {
    if (!window.ethereum) {
      setStatus(
        "No Web3 wallet found. Please install MetaMask or a compatible wallet."
      );
      return;
    }
    setStatus("");
    try {
      // Request account access
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // Add Hyperion Testnet
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [HYPERION_PARAMS],
      });
      setStatus("Hyperion Testnet added! Switch to it in your wallet.");
    } catch (err: unknown) {
      if ((err as { code: number; message: string }).code === 4001) {
        setStatus("User rejected the request.");
      } else {
        setStatus("Error: " + (err as { message: string }).message);
      }
    }
  };

  return (
    <div className="text-center">
      <Button variant="default" onClick={handleClick}>
        Add Hyperion Testnet
      </Button>
      {status && (
        <div style={{ color: status.startsWith("Error") ? "red" : "#2e7d32" }}>
          {status}
        </div>
      )}
    </div>
  );
};

export default ConnectHyperionWalletButton;
