import { useAtomValue } from 'jotai/utils';

import { userTokenAtom } from './store';
import { ExtendedAccessToken } from './token';

export const useUserInfo = (): ExtendedAccessToken | undefined => {
  //  We can add more properties to accessToken from there
  return useAtomValue(userTokenAtom);
};
