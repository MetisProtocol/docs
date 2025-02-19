"use client";

import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useSession } from "next-auth/react";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { GET_ALL_NFTS, GET_NFTS_BY_ADDRESS } from "@/lib/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { SimpleNFT } from "@/components/abi/SimpleNFT";
import AllNFTs from "@/components/nft/AllNFTs";
import MyNFTs from "@/components/nft/MyNFTs";
import { NFT } from "@/lib/const";
import { ToastContainer, toast } from "react-toastify";

const NFTGallery = () => {
  const { data: session } = useSession();
  const [sendAddress, setSendAddress] = useState("");

  // Write contract interaction for minting
  const {
    data: mintHash,
    writeContract: mint,
    isPending: isPendingMint,
    isError: isErrorTransactionMint,
  } = useWriteContract();

  const {
    data: transferHash,
    writeContract: transferNFT,
    isPending: isPendingTransfer,
    isError: isErrorTransactionTransfer,
  } = useWriteContract();

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
    variables: { id: session?.address || null, skip: 0, first: 10 },
  });

  const { isSuccess: isSuccessMint, isError: isErrorMint } =
    useWaitForTransactionReceipt({
      hash: mintHash,
    });

  const { isSuccess: isSuccessTransfer, isError: isErrorTransfer } =
    useWaitForTransactionReceipt({
      hash: transferHash,
    });

  useEffect(() => {
    if (isSuccessMint) {
      toast.success("NFT minted successfully");
      allNFTsRefetch();
      myNFTsRefetch();
    } else if (isErrorMint || isErrorTransactionMint) {
      toast.error(
        "NFT minting failed - check if you have enough sMETIS in your wallet"
      );
    }
  }, [
    isSuccessMint,
    isErrorMint,
    isErrorTransactionMint,
    allNFTsRefetch,
    myNFTsRefetch,
  ]);

  useEffect(() => {
    if (isSuccessTransfer) {
      toast.success("NFT transferred successfully");
      allNFTsRefetch();
      myNFTsRefetch();
    } else if (isErrorTransfer || isErrorTransactionTransfer) {
      toast.error("NFT transfer failed");
    }
  }, [
    isSuccessTransfer,
    isErrorTransfer,
    isErrorTransactionTransfer,
    allNFTsRefetch,
    myNFTsRefetch,
  ]);

  const transfer = (nft: NFT) => {
    transferNFT({
      address: "0x70062f9a402bfe8B1f98a18a5d5541b99a58023A",
      abi: SimpleNFT,
      functionName: "transferFrom",
      args: [session?.address || "", sendAddress || "", nft.identifier || 0],
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {session?.address && (
        <div className="mb-4 flex justify-center">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() =>
              mint({
                address: "0x70062f9a402bfe8B1f98a18a5d5541b99a58023A",
                abi: SimpleNFT,
                functionName: "mint",
              })
            }
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
            userAddress={session?.address || ""}
            isLoading={myNFTsLoading}
            nfts={myNFTsData?.account?.ERC721tokens || []}
            fetchMore={myNFTsFetchMore}
            transfer={transfer}
            setSendAddress={setSendAddress}
            isPendingTransfer={isPendingTransfer}
            sendAddress={sendAddress}
          />
        </Tab>
      </Tabs>
      <ToastContainer />
    </div>
  );
};

export default NFTGallery;
