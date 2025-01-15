"use client";

import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { SimpleNFT } from "@/components/abi/SimpleNFT";
import { useSession } from "next-auth/react";

const NFTGallery = () => {
  const { data: session } = useSession();

  // Read NFTs owned by user
  const {
    data: nfts = [],
    isLoading: isLoadingNFTs,
    refetch: refetchNFTs,
  } = useReadContract({
    address: "0x9dd5A53c45De96b6572a9c58Fe2257bfB99d604E",
    abi: SimpleNFT,
    functionName: "tokensOfOwner",
    args: [session?.address],
  }) as {
    data: number[];
    isLoading: boolean;
    refetch: () => void;
  };

  // Write contract interaction for minting
  const { writeContract: mint, data: hash } = useWriteContract({
    mutation: {
      onSuccess: (hash) => {
        console.log("Transaction submitted:", hash);
      },
    },
  });

  // Watch for transaction receipt
  const { status, isLoading } = useWaitForTransactionReceipt({
    hash,
  });

  if (status === "success") {
    refetchNFTs();
  }

  if (!session?.address) {
    return;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-4 flex justify-center">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() =>
            mint({
              address: "0x9dd5A53c45De96b6572a9c58Fe2257bfB99d604E",
              abi: SimpleNFT,
              functionName: "mint",
            })
          }
          disabled={isLoading}
        >
          {isLoading ? <>Minting...</> : "Mint New NFT"}
        </button>
      </div>

      {isLoadingNFTs ? (
        <div className="flex justify-center py-8">Loading</div>
      ) : nfts && nfts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nfts.map((tokenId: number) => (
            <div key={tokenId.toString()} className="p-4">
              <div className="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-400">
                  #{tokenId.toString()}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Token ID: {tokenId.toString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          No NFTs found. Mint your first one!
        </div>
      )}
    </div>
  );
};

export default NFTGallery;
