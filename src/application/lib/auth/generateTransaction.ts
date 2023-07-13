import { axiosFetch } from '$application/utils/axiosFetch';

export const generateTransaction = (accountAddress) => {
  const url = '/auth/init';

  const data = {
    walletAddress: accountAddress,
  };

  return axiosFetch({ method: 'post', data, url });
};
