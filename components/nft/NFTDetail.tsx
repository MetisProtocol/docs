import React, { useState } from "react";
import { useWriteContract } from "wagmi";
import { SimpleNFT } from "../abi/SimpleNFT";
import { useSession } from "next-auth/react";
import { NFT } from "@/lib/const";

interface NFTDetailProps {
  nfts: NFT[];
  allNFTsRefetch?: () => void;
  myNFTsRefetch?: () => void;
}

export const NFTDetail = ({
  nfts,
  allNFTsRefetch,
  myNFTsRefetch,
}: NFTDetailProps) => {
  const { data: session } = useSession();
  const [sendAddress, setSendAddress] = useState<string | null>(null);

  const { writeContract: transferNFT } = useWriteContract({
    mutation: {
      onSuccess: () => {
        if (allNFTsRefetch) allNFTsRefetch();
        if (myNFTsRefetch) myNFTsRefetch();
      },
    },
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2">ID</th>
            {nfts && nfts[0]?.owner?.id ? (
              <th className="px-4 py-2">Owner</th>
            ) : (
              <th className="px-4 py-2">Action</th>
            )}
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
                {nfts && nfts[0].owner?.id ? (
                  <td className="px-4 py-2">{nft.owner?.id}</td>
                ) : (
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Enter ETH address"
                        className="px-3 py-2 bg-gray-800 rounded text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                        onChange={(e) => setSendAddress(e.target.value)}
                      />
                      <button
                        className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
                        onClick={() =>
                          transferNFT({
                            address:
                              "0x70062f9a402bfe8B1f98a18a5d5541b99a58023A",
                            abi: SimpleNFT,
                            functionName: "transferFrom",
                            args: [
                              session?.address,
                              sendAddress,
                              nft.identifier,
                            ],
                          })
                        }
                        disabled={!sendAddress}
                      >
                        Transfer
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
  );
};

export default NFTDetail;
