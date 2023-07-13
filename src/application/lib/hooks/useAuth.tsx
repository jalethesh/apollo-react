import { useAtomValue } from 'jotai/utils';

import { accessTokenAtom } from '$application/lib/auth/store';

export const useIsAuth = () => {
  const isAuth = !!useAtomValue(accessTokenAtom);
  return [isAuth];
};
