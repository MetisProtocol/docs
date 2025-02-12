"use client";

import { ThirdwebProvider } from "thirdweb/react";

type Props = {
  children: React.ReactNode;
};

const Web3Provider = ({ children }: Props) => {
  return <ThirdwebProvider>{children}</ThirdwebProvider>;
};
export default Web3Provider;
