import axiosinstance from 'axios';

import { getAccessToken } from './auth/store';

const headers: HeadersInit = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
const accessToken = getAccessToken();
if (accessToken) {
  headers.authorization = `Bearer ${accessToken}`;
}
const axios = axiosinstance.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER_ADDRESS,
  timeout: 20000,
  headers,
  withCredentials: true,
});

export default axios;
