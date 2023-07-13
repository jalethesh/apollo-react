import { atomWithStorage } from 'jotai/utils';

import { AccessToken } from './AuthProvider';

export const userTokenAtom = atomWithStorage<AccessToken | undefined>(
  'userToken',
  undefined
);

export const accessTokenAtom = atomWithStorage<string | undefined>(
  'accessToken',
  undefined
);

// this is our in memory storage for user's JWT Access Token
// We don't store this in local-storage or cookie because of security reasons
let accessToken: string | undefined;

export const getAccessToken = (): string | undefined => accessToken;
export const storeAccessToken = (at: string): void => {
  accessToken = at;
};
