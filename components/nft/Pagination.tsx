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
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={loadMoreNFTs}
      >
        Load More
      </button>
    )
  );
}
