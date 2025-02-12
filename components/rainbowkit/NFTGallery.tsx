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

const NFTGallery = () => {
  const { data: session } = useSession();
  const [sendAddress, setSendAddress] = useState("");

  // Write contract interaction for minting
  const {
    data: mintHash,
    writeContract: mint,
    isPending: isPendingMint,
  } = useWriteContract();

  const {
    data: transferHash,
    writeContract: transferNFT,
    isPending: isPendingTransfer,
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

  const { isSuccess: isSuccessMint } = useWaitForTransactionReceipt({
    hash: mintHash,
  });

  const { isSuccess: isSuccessTransfer } = useWaitForTransactionReceipt({
    hash: transferHash,
  });

  useEffect(() => {
    if (isSuccessMint) {
      allNFTsRefetch();
      myNFTsRefetch();
    }
  }, [isSuccessMint, allNFTsRefetch, myNFTsRefetch]);

  useEffect(() => {
    if (isSuccessTransfer) {
      allNFTsRefetch?.();
      myNFTsRefetch?.();
    }
  }, [isSuccessTransfer, allNFTsRefetch, myNFTsRefetch]);

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
    </div>
  );
};

export default NFTGallery;
