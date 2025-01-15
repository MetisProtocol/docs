"use client";

import { useSession } from "next-auth/react";

export const SIWEDemo = () => {
  const { data: session, status } = useSession();

  return (
    <div className="mt-4">
      <div>Status: {status}</div>
      <div>Address: {session?.address || "Not connected"}</div>
    </div>
  );
};

export default SIWEDemo;
