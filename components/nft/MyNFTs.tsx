"use client";

import { NFTDetail } from "@/components/nft/NFTDetail";
import { NFT } from "@/lib/const";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface MyNFTsProps {
  myNFTsLoading: boolean;
  myNFTsData: {
    account?: {
      ERC721tokens: NFT[];
    };
  };
  myNFTsFetchMore: (options: {
    variables: { skip: number; first: number };
    updateQuery: (
      prev: { account?: { ERC721tokens: NFT[] } },
      {
        fetchMoreResult,
      }: { fetchMoreResult: { account?: { ERC721tokens: NFT[] } } }
    ) => { account: { ERC721tokens: NFT[] } };
  }) => void;
  myNFTsRefetch: () => void;
}

export default function MyNFTs({
  myNFTsLoading,
  myNFTsData,
  myNFTsFetchMore,
  myNFTsRefetch,
}: MyNFTsProps) {
  const { data: session } = useSession();
  const [nfts, setNfts] = useState<NFT[]>(
    myNFTsData?.account?.ERC721tokens || []
  );
  const [hasMore, setHasMore] = useState(true);

  const loadMoreNfts = () => {
    myNFTsFetchMore({
      variables: { skip: nfts?.length, first: 10 },
      updateQuery: (
        prev: { account?: { ERC721tokens: NFT[] } },
        {
          fetchMoreResult,
        }: { fetchMoreResult: { account?: { ERC721tokens: NFT[] } } }
      ) => {
        if (!fetchMoreResult?.account)
          return {
            account: {
              ERC721tokens: prev.account?.ERC721tokens || [],
            },
          };

        return {
          account: {
            ERC721tokens: [
              ...(prev.account?.ERC721tokens || []),
              ...fetchMoreResult.account.ERC721tokens,
            ],
          },
        };
      },
    });
  };

  useEffect(() => {
    if (!myNFTsLoading && myNFTsData) {
      setNfts(myNFTsData?.account?.ERC721tokens || []);
      // Check if initial data is less than the requested amount
      if (
        !myNFTsData?.account?.ERC721tokens ||
        myNFTsData.account.ERC721tokens.length < 10
      ) {
        setHasMore(false);
      }
    }
  }, [myNFTsLoading, myNFTsData]);

  return (
    <div>
      <NFTDetail nfts={nfts} myNFTsRefetch={myNFTsRefetch} />
      {session?.address && hasMore && !myNFTsLoading && (
        <button
          onClick={loadMoreNfts}
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Load More
        </button>
      )}
    </div>
  );
}
