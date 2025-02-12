"use client";

import { client } from "./Client";
import { ConnectButton } from "thirdweb/react";
import {
  generatePayload,
  isLoggedIn,
  login,
  logout,
} from "@/lib/thirdweb/login";
import { defineChain } from "thirdweb/chains";

const Profile = () => {
  return (
    <ConnectButton
      client={client}
      accountAbstraction={{
        chain: defineChain(59902), // Metis Sepolia
        sponsorGas: true,
      }}
      auth={{
        isLoggedIn: async (address) => {
          console.log("checking if logged in!", { address });
          return await isLoggedIn();
        },
        doLogin: async (params) => {
          console.log("logging in!");
          await login(params);
        },
        getLoginPayload: async ({ address }) =>
          generatePayload({ address, chainId: 59902 }),
        doLogout: async () => {
          console.log("logging out!");
          await logout();
        },
      }}
    />
  );
};

export default Profile;
