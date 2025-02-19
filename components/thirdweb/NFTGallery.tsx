"use client";

import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import AllNFTs from "@/components/nft/AllNFTs";
import MyNFTs from "@/components/nft/MyNFTs";
import { GET_ALL_NFTS, GET_NFTS_BY_ADDRESS } from "@/lib/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import {
  useActiveAccount,
  useSendTransaction,
  useWaitForReceipt,
} from "thirdweb/react";
import { defineChain, getContract, prepareContractCall } from "thirdweb";
import { client } from "@/components/thirdweb/Client";
import { NFT } from "@/lib/const";
import { toast, ToastContainer } from "react-toastify";
const NFTGallery = () => {
  const account = useActiveAccount();
  const [sendAddress, setSendAddress] = useState("");
  // Write contract interaction for minting
  const contract = getContract({
    address: "0x70062f9a402bfe8B1f98a18a5d5541b99a58023A",
    chain: defineChain(59902),
    client,
  });

  const {
    data: mintData,
    mutate: mintTx,
    isPending: isPendingMint,
    isError: isErrorMintTransaction,
  } = useSendTransaction();

  const {
    data: transferData,
    mutate: sendTx,
    isPending: isPendingTransfer,
    isError: isErrorTransferTransaction,
  } = useSendTransaction();

  const {
    loading: allNFTsLoading,
    data: allNFTsData,
    fetchMore: allNFTsFetchMore,
    refetch: allNFTsRefetch,
  } = useQuery(GET_ALL_NFTS, {
    variables: { skip: 0, first: 10 },
  });

  const {
    loading: myNFTsLoading,
    data: myNFTsData,
    fetchMore: myNFTsFetchMore,
    refetch: myNFTsRefetch,
  } = useQuery(GET_NFTS_BY_ADDRESS, {
    variables: { id: account?.address, skip: 0, first: 10 },
  });

  const { isSuccess: isSuccessMint, isError: isErrorMint } = useWaitForReceipt({
    transactionHash: mintData?.transactionHash || "0x0",
    client,
    chain: defineChain(59902),
  });

  const { isSuccess: isSuccessTransfer, isError: isErrorTransfer } =
    useWaitForReceipt({
      transactionHash: transferData?.transactionHash || "0x0",
      client,
      chain: defineChain(59902),
    });

  useEffect(() => {
    if (isSuccessMint) {
      allNFTsRefetch();
      myNFTsRefetch();
      toast.success("NFT minted successfully");
    } else if (isErrorMint || isErrorMintTransaction) {
      toast.error("NFT minting failed");
    }
  }, [
    isSuccessMint,
    isErrorMint,
    isErrorMintTransaction,
    allNFTsRefetch,
    myNFTsRefetch,
  ]);

  useEffect(() => {
    if (isSuccessTransfer) {
      allNFTsRefetch();
      myNFTsRefetch();
      toast.success("NFT transferred successfully");
    } else if (isErrorTransfer || isErrorTransferTransaction) {
      toast.error("NFT transfer failed");
    }
  }, [
    isSuccessTransfer,
    isErrorTransfer,
    isErrorTransferTransaction,
    allNFTsRefetch,
    myNFTsRefetch,
  ]);

  const transfer = (nft: NFT) => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function transferFrom(address from, address to, uint256 tokenId)",
      params: [
        account?.address || "",
        sendAddress || "",
        BigInt(nft.identifier || 0),
      ],
    });
    sendTx(transaction);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {account?.address && (
        <div className="mb-4 flex justify-center">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              const transaction = prepareContractCall({
                contract,
                method: "function mint()",
                params: [],
              });
              mintTx(transaction);
            }}
            disabled={isPendingMint}
          >
            {isPendingMint ? "Minting..." : "Mint New NFT"}
          </button>
        </div>
      )}
      <Tabs items={["All NFTs", "My NFTs"]}>
        <Tab value="All NFTs">
          <AllNFTs
            isLoading={allNFTsLoading}
            nfts={allNFTsData?.erc721Tokens || []}
            fetchMore={allNFTsFetchMore}
          />
        </Tab>
        <Tab value="My NFTs">
          <MyNFTs
            userAddress={account?.address || ""}
            isLoading={myNFTsLoading}
            nfts={myNFTsData?.account?.ERC721tokens || []}
            fetchMore={myNFTsFetchMore}
            transfer={transfer}
            setSendAddress={setSendAddress}
            sendAddress={sendAddress}
            isPendingTransfer={isPendingTransfer}
          />
        </Tab>
      </Tabs>
      <ToastContainer />
    </div>
  );
};

export default NFTGallery;
