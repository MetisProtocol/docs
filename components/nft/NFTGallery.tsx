"use client";

import { useWriteContract } from "wagmi";
import { SimpleNFT } from "@/components/abi/SimpleNFT";
import { useSession } from "next-auth/react";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import AllNFTs from "@/components/nft/AllNFTs";
import MyNFTs from "@/components/nft/MyNFTs";
import { GET_ALL_NFTS, GET_NFTS_BY_ADDRESS } from "@/lib/queries";
import { useQuery } from "@apollo/client";

const NFTGallery = () => {
  const { data: session } = useSession();

  // Write contract interaction for minting
  const { writeContract: mint, isPending } = useWriteContract({
    mutation: {
      onSettled: () => {
        allNFTsRefetch();
        myNFTsRefetch();
      },
    },
  });

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
    variables: { id: session?.address, skip: 0, first: 10 },
  });

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
            disabled={isPending}
          >
            {isPending ? <>Minting...</> : "Mint New NFT"}
          </button>
        </div>
      )}
      <Tabs items={["All NFTs", "My NFTs"]}>
        <Tab value="All NFTs">
          <AllNFTs
            allNFTsLoading={allNFTsLoading}
            allNFTsData={allNFTsData}
            allNFTsFetchMore={allNFTsFetchMore}
            allNFTsRefetch={allNFTsRefetch}
          />
        </Tab>
        <Tab value="My NFTs">
          <MyNFTs
            myNFTsLoading={myNFTsLoading}
            myNFTsData={myNFTsData}
            myNFTsFetchMore={myNFTsFetchMore}
            myNFTsRefetch={myNFTsRefetch}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default NFTGallery;
