import { getWeb3StorageClient } from './getWeb3StorageClient';

export const uploadFile = async (file) => {
  const storage = getWeb3StorageClient();
  return storage.put([file], { wrapWithDirectory: false });
};
