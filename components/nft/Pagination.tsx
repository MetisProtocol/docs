import { useEffect, useState } from "react";
import { NFT } from "@/lib/const";

export default function Pagination({
  isLoading,
  nfts,
  fetchMore,
}: {
  isLoading: boolean;
  nfts: NFT[];
  fetchMore: (options: {
    variables: { skip: number; first: number };
    updateQuery: (
      prev: { erc721Tokens: NFT[] },
      { fetchMoreResult }: { fetchMoreResult: { erc721Tokens: NFT[] } }
    ) => { erc721Tokens: NFT[] };
  }) => void;
}) {
  const numItems = 10;
  const [hasMore, setHasMore] = useState(true);

  const loadMoreNFTs = () => {
    fetchMore({
      variables: { skip: nfts?.length, first: numItems },
      updateQuery: (
        prev: { erc721Tokens: NFT[] },
        { fetchMoreResult }: { fetchMoreResult: { erc721Tokens: NFT[] } }
      ) => {
        if (!fetchMoreResult) return prev;
        const newNfts = fetchMoreResult.erc721Tokens || [];
        // If we received fewer items than requested, we've reached the end
        if (newNfts.length < numItems) {
          setHasMore(false);
        }
        return {
          erc721Tokens: [...prev.erc721Tokens, ...newNfts],
        };
      },
    });
  };

  useEffect(() => {
    if (!isLoading) {
      // If we received fewer items than requested, we've reached the end
      if (!nfts || nfts.length < numItems) {
        setHasMore(false);
      }
    }
  }, [isLoading, nfts]);

  return (
    hasMore &&
    !isLoading && (
      <button
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={loadMoreNFTs}
      >
        Load More
      </button>
    )
  );
}
