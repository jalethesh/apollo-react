import { Web3Storage } from 'web3.storage';

let web3StorageClient: Web3Storage;
export const getWeb3StorageClient = (): Web3Storage => {
  if (!web3StorageClient) {
    web3StorageClient = new Web3Storage({
      token: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_TOKEN!,
    });
  }

  return web3StorageClient;
};
