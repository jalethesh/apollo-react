import { getAccessToken } from './auth/store';
import { NetworkError } from './NetworkError';

export const request = async <T = any>(
  endpoint: string,
  method = 'GET',
  requestBody?: any
): Promise<T> => {
  let body: any;
  if (requestBody) {
    body = JSON.stringify(requestBody);
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const accessToken = getAccessToken();
  if (accessToken) {
    headers.authorization = `Bearer ${accessToken}`;
  }

  // eslint-disable-next-line no-console
  console.log(endpoint, {
    method: method.toUpperCase(),
    body,
    headers,
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_ADDRESS}${endpoint}`,
    {
      method: method.toUpperCase(),
      body,
      headers,
      credentials: 'include',
    }
  );

  if (!response.ok) {
    if (process.env.NODE_ENV !== 'production' && response.status !== 499) {
      // eslint-disable-next-line no-console
      console.error(
        'request failed: ',
        response,
        await response.clone().json()
      );
    }
    throw new NetworkError(response);
  }

  return response.json();
};
