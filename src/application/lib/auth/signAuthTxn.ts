import algosdk from 'algosdk';

import { getMyAlgo } from '$application/utils/getMyAlgoWallet';

export const signAuthTxn = async (encodedTxn): Promise<string> => {
  const txn = algosdk.decodeUnsignedTransaction(
    Buffer.from(encodedTxn, 'base64')
  );

  const myAlgoWallet = await getMyAlgo();

  const signedTxnRaw = await myAlgoWallet.signTransaction(txn.toByte());

  const encodeSTxn = window.btoa(
    String.fromCharCode.apply(null, signedTxnRaw?.blob as any)
  );

  return encodeSTxn;
};
