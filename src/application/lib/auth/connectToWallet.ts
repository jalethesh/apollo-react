import { axiosFetch } from '$application/utils/axiosFetch';

interface IResponse {
  token: string;
}
export const connectToWallet = async ({
  accountAddress,
  txn,
  stxn,
}): Promise<IResponse | null> => {
  const url = '/auth/connect-wallet';

  const data = {
    walletAddress: accountAddress,
    txn,
    stxn,
  };

  return axiosFetch<{ token: string }>({ method: 'post', data, url });
};
