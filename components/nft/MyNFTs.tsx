"use client";

import { NFT } from "@/lib/const";
import Pagination from "@/components/nft/Pagination";

interface MyNFTsProps {
  userAddress: string;
  isLoading: boolean;
  nfts: NFT[];
  fetchMore: (options: {
    variables: { skip: number; first: number };
    updateQuery: (
      prev: { erc721Tokens: NFT[] },
      { fetchMoreResult }: { fetchMoreResult: { erc721Tokens: NFT[] } }
    ) => { erc721Tokens: NFT[] };
  }) => void;
  transfer: (nft: NFT) => void;
  setSendAddress: (address: string) => void;
  sendAddress: string;
  isPendingTransfer: boolean;
}

export default function MyNFTs({
  isLoading,
  nfts,
  fetchMore,
  setSendAddress,
  sendAddress,
  isPendingTransfer,
  transfer,
}: MyNFTsProps) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2">ID</th>
              {nfts && <th className="px-4 py-2">Action</th>}
            </tr>
          </thead>
          <tbody>
            {nfts?.length > 0 ? (
              nfts.map((nft: NFT, key: number) => (
                <tr
                  key={key}
                  className="bg-gray-900 text-white border-b border-gray-800"
                >
                  <td className="px-4 py-2">{nft.identifier}</td>
                  {nfts && (
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Enter ETH Address"
                          className="px-3 py-2 bg-gray-800 rounded text-white border border-gray-700 focus:border-blue-500 focus:outline-none w-full"
                          onChange={(e) => setSendAddress(e.target.value)}
                        />
                        <button
                          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
                          onClick={() => transfer(nft)}
                          disabled={!sendAddress}
                        >
                          {isPendingTransfer ? "Transferring..." : "Transfer"}
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-4 py-2 text-center text-gray-500">
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
