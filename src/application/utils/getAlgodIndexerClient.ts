import { Indexer } from 'algosdk';

let algodIndexerClient: Indexer;
export const getAlgodIndexerClient = (): Indexer => {
  if (!algodIndexerClient) {
    algodIndexerClient = new Indexer(
      '',
      process.env.NEXT_PUBLIC_API_ALGO_EXPLORER_INDEXER,
      ''
    );
  }

  return algodIndexerClient;
};
