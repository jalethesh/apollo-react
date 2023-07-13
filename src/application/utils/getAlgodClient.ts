import { Algodv2 } from 'algosdk';

let algodClient: Algodv2;
export const getAlgodClient = (baseServer?: string): Algodv2 => {
  const token = 'strong Token';
  if (!algodClient || baseServer) {
    algodClient = new Algodv2(
      token,
      baseServer ?? process.env.NEXT_PUBLIC_API_ALGOEXPLORER,
      ''
    );
  }

  return algodClient;
};
