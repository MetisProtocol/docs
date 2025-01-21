"use client";

import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";

export const SIWEDemo = () => {
  const { data: session, status } = useSession();
  const { connector } = useAccount();

  return (
    <div className="mt-4">
      <div>Status: {status}</div>
      <div>Address: {session?.address || "Not connected"}</div>
      <div>Wallet: {connector?.name || "Not connected"}</div>
    </div>
  );
};

export default SIWEDemo;
