import { gql } from "@apollo/client";

export const GET_NFTS_BY_ADDRESS = gql`
  query Account($id: String!, $skip: Int!, $first: Int!) {
    account(id: $id) {
      ERC721tokens(orderBy: identifier, skip: $skip, first: $first) {
        identifier
      }
    }
  }
`;

export const GET_ALL_NFTS = gql`
  query ($skip: Int!, $first: Int!) {
    erc721Tokens(orderBy: identifier, orderDirection: desc, skip: $skip, first: $first) {
      identifier
      owner {
        id
      }
    }
  }
`;
