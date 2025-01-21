"use client";

import { NFTDetail } from "@/components/nft/NFTDetail";
import { NFT } from "@/lib/const";
import { useState, useEffect } from "react";

interface AllNFTsProps {
  allNFTsLoading: boolean;
  allNFTsData: {
    erc721Tokens: NFT[];
  };
  allNFTsFetchMore: (options: {
    variables: { skip: number; first: number };
    updateQuery: (
      prev: { erc721Tokens: NFT[] },
      { fetchMoreResult }: { fetchMoreResult: { erc721Tokens: NFT[] } }
    ) => { erc721Tokens: NFT[] };
  }) => void;
  allNFTsRefetch: () => void;
}

export default function AllNFTs({
  allNFTsLoading,
  allNFTsData,
  allNFTsFetchMore,
  allNFTsRefetch,
}: AllNFTsProps) {
  const [nfts, setNfts] = useState<NFT[]>(allNFTsData?.erc721Tokens || []);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreNFTs = () => {
    allNFTsFetchMore({
      variables: { skip: nfts?.length, first: 10 },
      updateQuery: (
        prev: { erc721Tokens: NFT[] },
        { fetchMoreResult }: { fetchMoreResult: { erc721Tokens: NFT[] } }
      ) => {
        if (!fetchMoreResult) return prev;
        const newNfts = fetchMoreResult.erc721Tokens || [];
        // If we received fewer items than requested, we've reached the end
        if (newNfts.length < 10) {
          setHasMore(false);
        }
        return {
          erc721Tokens: [...prev.erc721Tokens, ...newNfts],
        };
      },
    });
  };

  useEffect(() => {
    if (!allNFTsLoading && allNFTsData) {
      setNfts(allNFTsData?.erc721Tokens || []);
      // Check if initial data is less than the requested amount
      if (!allNFTsData?.erc721Tokens || allNFTsData.erc721Tokens.length < 10) {
        setHasMore(false);
      }
    }
  }, [allNFTsLoading, allNFTsData]);

  return (
    <div>
      <NFTDetail nfts={nfts} allNFTsRefetch={allNFTsRefetch} />
      {hasMore && !allNFTsLoading && (
        <button
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={loadMoreNFTs}
        >
          Load More
        </button>
      )}
    </div>
  );
}
