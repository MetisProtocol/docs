"use client";

import { NFT } from "@/lib/const";
import Pagination from "@/components/nft/Pagination";

interface AllNFTsProps {
  isLoading: boolean;
  nfts: NFT[];
  fetchMore: (options: {
    variables: { skip: number; first: number };
    updateQuery: (
      prev: { erc721Tokens: NFT[] },
      { fetchMoreResult }: { fetchMoreResult: { erc721Tokens: NFT[] } }
    ) => { erc721Tokens: NFT[] };
  }) => void;
}

export default function AllNFTs({ isLoading, nfts, fetchMore }: AllNFTsProps) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              {nfts && <th className="px-4 py-2">Owner</th>}
            </tr>
          </thead>
          <tbody>
            {nfts?.length > 0 ? (
              nfts.map((nft: NFT, key: number) => (
                <tr key={key}>
                  <td className="px-4 py-2">{nft.identifier}</td>
                  {nfts && <td className="px-4 py-2">{nft.owner?.id}</td>}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-4 py-2 text-center">
                  No NFTs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination isLoading={isLoading} nfts={nfts} fetchMore={fetchMore} />
    </div>
  );
}
