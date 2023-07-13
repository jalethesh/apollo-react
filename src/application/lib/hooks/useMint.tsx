import { useState } from 'react';

import algosdk from 'algosdk';
import { useQueryClient } from 'react-query';

import { Song } from '$application/components/pages/Main/SetList/store';
import { getWalletAccountAddress } from '$application/lib/auth/getWalletAccountAddress';
import { getAlgodClient } from '$application/utils/getAlgodClient';
import { getMyAlgo } from '$application/utils/getMyAlgoWallet';
import { uploadFile } from '$application/utils/uploadFile';

import type { SongMint, SongListMint } from './Mint';

enum STATES {
  START = 'starting mint process',
  UPLOAD_FILE = 'uploading Asset',
  ENCRYPT_NOTE = 'encrypting note',
  CREATE_TXN = 'creating transaction',
  SIGN_TRANSACTION = 'signing transaction',
  SENDING_TRANSACTION = 'sending transaction',
  WAIT_TRANSACTION_CONFIRMATION = 'confirming transaction',
  DONE = 'mint process has been finished successfully',
}
interface Response {
  assetId: number;
}
interface IMintHook {
  onComplete?: (data: Response) => void;
  onError?: (err: any) => void;
}
const useMint = ({ onComplete, onError }: IMintHook) => {
  const [currentStep, setCurrentStep] = useState<STATES | undefined>();
  const queryClient = useQueryClient();

  const mintHandler = async (data: SongListMint) => {
    setCurrentStep(STATES.START);

    const algodClient = await getAlgodClient(
      process.env.NEXT_PUBLIC_API_ALGOEXPLORER
    );
    const params = await algodClient.getTransactionParams().do();
    const addr = (await getWalletAccountAddress()) ?? 'notFound';
    const myAlgoWallet = await getMyAlgo();
    const defaultFrozen = false;
    const decimals = 0;
    const totalIssuance = 1;
    // TODO ADD unit name later
    const unitName = data.unitName;
    const assetName = data.assetsName;
    setCurrentStep(STATES.UPLOAD_FILE);
    let SongList;
    try {
      SongList = await uploadFile(new Blob([JSON.stringify(data.data)]));
    } catch (e) {
      console.log(e);
    }

    const assetURL = `ipfs://${SongList}`;
    setCurrentStep(STATES.ENCRYPT_NOTE);

    const note = Uint8Array.from(
      Array.from(
        JSON.stringify(getARC69(data, data.assetMimeType, assetURL))
      ).map((letter) => letter.charCodeAt(0))
    );
    const assetMetadataHash = undefined;
    const manager = addr;
    const reserve = addr;
    const freeze = undefined;
    const clawback = undefined;
    setCurrentStep(STATES.CREATE_TXN);
    const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
      addr,
      note,
      totalIssuance,
      decimals,
      defaultFrozen,
      manager,
      reserve,
      freeze,
      clawback,
      unitName,
      assetName,
      assetURL,
      assetMetadataHash,
      params
    );

    setCurrentStep(STATES.SIGN_TRANSACTION);
    let rawSignedTxn;
    try {
      rawSignedTxn = await myAlgoWallet.signTransaction(txn.toByte());
    } catch (e) {
      console.log(e);
    }
    setCurrentStep(STATES.SENDING_TRANSACTION);
    const tx = await algodClient.sendRawTransaction(rawSignedTxn.blob).do();

    setCurrentStep(STATES.WAIT_TRANSACTION_CONFIRMATION);
    // wait for transaction to be confirmed
    await algosdk.waitForConfirmation(algodClient, rawSignedTxn.txID, 4);

    // Get the new asset's information from the creator account
    const ptx = await algodClient.pendingTransactionInformation(tx.txId).do();

    const assetId = ptx['asset-index'];

    await queryClient.invalidateQueries('getAccountAssets');

    setCurrentStep(STATES.DONE);

    return assetId;
  };

  const onMint = async (data: SongListMint) => {
    try {
      const assetId = await mintHandler(data);
      onComplete?.({ assetId });
    } catch (err) {
      onError?.(err);
    }
  };
  const totalSteps = Object.keys(STATES).length;

  const progressValue =
    ((Object.values(STATES).findIndex((state) => state === currentStep) + 1) /
      totalSteps) *
    100;

  return {
    onMint,
    isMinting: currentStep && currentStep !== STATES.DONE,
    currentStep,
    onComplete,
    progressedValue: progressValue,
  };
};

function createSongListMetaData(songs: Song[]): SongMint[] {
  const newSongList: SongMint[] = [];

  songs.forEach((song) => {
    newSongList.push({ song: song.title, isPlayed: song.isPlayed === 'yes' });
  });

  return newSongList;
}

function getARC69(data: SongListMint, mimeType, assetUrl) {
  const { data: propertiesData } = data;

  return {
    standard: 'arc69',
    description: data.description,
    mime_type: mimeType,
    media_url: assetUrl,
    external_url: assetUrl,
    properties: createSongListMetaData(propertiesData),
  };
}

export default useMint;
