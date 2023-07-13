import { createContext, useCallback, useEffect } from 'react';

import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import jwtDecode from 'jwt-decode';

import { logout } from '$application/lib/api';
import axios from '$application/lib/axios';

import { accessTokenAtom, storeAccessToken, userTokenAtom } from './store';

interface RefreshTokenResponse {
  accessToken: string;
}

export interface AccessToken {
  exp: number;
  iat: number;
  phoneNumber: string;
}

const tokenRefreshWindow = 30 * 1000;

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }) => {
  const setDecodedAccessToken = useUpdateAtom(userTokenAtom);
  const [ATatom, setAccessToken] = useAtom(accessTokenAtom);

  const startRefreshingAccessToken = useCallback(async () => {
    try {
      const {
        data: { accessToken },
      } = await axios.get<RefreshTokenResponse>('/api/auth/refreshToken');
      storeAccessToken(accessToken);
      setAccessToken(accessToken);

      const decodedToken = jwtDecode<AccessToken>(accessToken);
      setDecodedAccessToken(decodedToken);

      // refresh the token ${tokenRefreshWindow} milliseconds before expiration
      const remainingToExpiration = decodedToken.exp * 1000 - Date.now();
      // This is to prevent integer overflow for setTimeout when access token expires in more than a month
      const millisecToNextCheck = Math.min(
        remainingToExpiration - tokenRefreshWindow,
        24 * 60 * 60 * 1000 // 24h is the max value for refresh interval
      );

      return setTimeout(startRefreshingAccessToken, millisecToNextCheck);
    } catch (err) {
      console.log('error on refetch data : ', err);
      try {
        await logout();
        setAccessToken(undefined);
        setDecodedAccessToken(undefined);
      } catch (e) {
        console.log(e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ATatom) {
      startRefreshingAccessToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const context = {
    startRefreshingAccessToken,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
