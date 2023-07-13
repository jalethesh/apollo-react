import MyAlgoConnect from '@randlabs/myalgo-connect';

let myAlgo: MyAlgoConnect;
export const getMyAlgo = async (): Promise<MyAlgoConnect> => {
  if (!myAlgo) {
    if (typeof window !== undefined) {
      const MyAlgo = (await import('@randlabs/myalgo-connect')).default;

      return new MyAlgo();
    }
  }
  return myAlgo;
};
