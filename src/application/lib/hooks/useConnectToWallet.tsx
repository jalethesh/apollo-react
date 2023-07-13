import { useState } from 'react';

import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';

import { generateTransaction } from '$application/lib/auth/generateTransaction';

import { connectToWallet } from '../auth/connectToWallet';
import { getWalletAccountAddress } from '../auth/getWalletAccountAddress';
import { signAuthTxn } from '../auth/signAuthTxn';

export const useConnectToWallet = () => {
  const [loading, setLoading] = useState(false);
  const { mutateAsync: mutateGenerateTransaction } = useMutation(
    generateTransaction,
    {
      onError: (error) => {
        console.error('==> [generateTransaction] ==>', error);
      },
    }
  );

  const { mutateAsync: mutateConnectToWallet } = useMutation(connectToWallet, {
    onError: (error) => {
      console.error('==> [connectToWallet] ==>', error);
    },
  });

  const { enqueueSnackbar } = useSnackbar();
  const onConnectToWallet = (storeUser) => async () => {
    setLoading(true);
    try {
      const accountAddress = await getWalletAccountAddress();
      const txn = await mutateGenerateTransaction(accountAddress);
      const stxn = await signAuthTxn(txn);
      const response = await mutateConnectToWallet({
        accountAddress,
        txn,
        stxn,
      });
      if (response?.token) {
        Cookies.set(
          process.env.TOKEN_COOKIE_NAME!,
          JSON.stringify({ token: response.token, accountAddress }),
          {
            expires: +process.env.TOKEN_COOKIE_EXPIRATION!,
            secure: true,
            sameSite: 'None',
          }
        );
        storeUser();
      }
    } catch (err: any) {
      enqueueSnackbar(err.message, {
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return { onConnectToWallet, isLoading: loading };
};
