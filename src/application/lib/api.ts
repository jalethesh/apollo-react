import { AxiosResponse } from 'axios';

import axios from '$application/lib/axios';

interface LoginOpts {
  phoneNumber: string;
}

interface VerificationOpts {
  phoneNumber: string;
  code: string;
}

interface ResponseLogin {
  refreshToken: string;
}

interface ResponseVerify {
  accessToken: string;
}

export const login = async (
  opts: LoginOpts
): Promise<AxiosResponse<ResponseLogin>> => {
  return axios.post(
    `/api/auth/login`,
    { phoneNumber: opts.phoneNumber },
    {
      withCredentials: true,
    }
  );
};

export const verify = async (
  opts: VerificationOpts
): Promise<AxiosResponse<ResponseVerify>> => {
  return axios.post('/api/auth/verify', {
    phoneNumber: opts.phoneNumber,
    code: opts.code,
  });
};

export const logout = async (): Promise<AxiosResponse<ResponseVerify>> => {
  return axios.post('/api/auth/logout');
};
