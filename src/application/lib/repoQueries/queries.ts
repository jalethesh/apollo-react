import { gql } from '@apollo/client';

export const voteMutation = gql`
  mutation (
    $checkin: Boolean!
    $checkinLat: String!
    $checkinLong: String!
    $setListId: Int!
    $votes: [SetListVotesInput!]!
  ) {
    voteSetList(
      checkin: $checkin
      checkinLat: $checkinLat
      checkinLong: $checkinLong
      setListId: $setListId
      votes: $votes
    ) {
      id
      appId
    }
  }
`;

export const reorderMutation = gql`
  mutation ($setListId: Int!, $songs: [SongOrderInput!]!) {
    setlistSongsOrder(setListId: $setListId, songs: $songs)
  }
`;

export const addSongContract = gql`
  mutation (
    $appId: Int!
    $songId: Int!
    $setListId: Int!
    $image: String!
    $artist: String!
    $title: String!
    $order: Int!
  ) {
    newSongContract(
      appId: $appId
      songId: $songId
      setListId: $setListId
      image: $image
      artist: $artist
      title: $title
      order: $order
    ) {
      songId
      id
    }
  }
`;

export const deleteSongContract = gql`
  mutation ($id: Int!) {
    deleteSongContract(id: $id) {
      id
    }
  }
`;

export const alreadyVoted = gql`
  query ($appId: Int!) {
    alreadyVoted(appId: $appId) {
      assetId
    }
  }
`;

export const startSetListVoting = gql`
  mutation ($setListId: Int!) {
    startSetListVoting(setListId: $setListId) {
      id
      appId
      songs {
        appId
      }
    }
  }
`;

export const setListsQuery = gql`
  query ($filtration: SetListInput, $location: LocationInput!) {
    setlists(filtration: $filtration, location: $location) {
      id
      appId
      startDate
      endDate
      title
      image
      lat
      rewardAmount
      long
      distance
      cityName
      songs {
        id
        appId
        title
        artist
        image
        songId
        setListId
        order
      }
    }
  }
`;

export const setListQuery = gql`
  query ($setListId: Int!) {
    getSetlist(setListId: $setListId) {
      id
      appId
      startDate
      endDate
      title
      image
      lat
      rewardAmount
      long
      distance
      cityName
      songs {
        id
        appId
        title
        artist
        image
        songId
        setListId
        order
      }
    }
  }
`;

export const generateWalletQuery = gql`
  mutation ($phoneNumber: String!) {
    generateWallet(phoneNumber: $phoneNumber) {
      walletAddress
      phoneNumber
      amount
    }
  }
`;

export const NFTQuery = gql`
  query Wallet {
    nfts {
      index
      clawback
      creator
      freeze
      manager
      reserve
      name
      deleted
      total
      unitName
      url
      metadata
    }
  }
`;

export const transactionsQuery = gql`
  query Transactions {
    transactions {
      sender
      receiver
      note
      id
      amount
      fee
      roundTime
    }
  }
`;

export const walletQuery = gql`
  query Wallet {
    wallet {
      amount
      phoneNumber
      walletAddress
    }
  }
`;
