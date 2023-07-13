import type { AxiosError, AxiosRequestConfig } from 'axios';
import Axios from 'axios';

const axiosClient = Axios.create({
  baseURL: process.env.API_ALGOEXPLORER,
  timeout: 1_000_000,
});

export interface FetchAPIResponse {
  success: boolean;
  error: string;
  message: string;
  data: any;
  statusCode: number;
}

export const axiosFetch = <T = FetchAPIResponse>(
  config: AxiosRequestConfig
): Promise<T> => {
  if (config.method?.toLowerCase() === 'purge') {
    throw new Error('Method PURGE is not supported');
  }

  const responseType = config.responseType ?? 'json';

  if (responseType === 'document') {
    throw new Error(`This response type is not supported: ${responseType}`);
  }

  const headers = config.headers ?? {};

  const source = Axios.CancelToken.source();

  const promise = new Promise<T>((resolve, reject) => {
    axiosClient
      .request<T>({
        ...config,
        headers,
        cancelToken: source.token,
      })
      .then((response) => resolve(response.data))
      .catch((error_: AxiosError) => {
        const error = error_.isAxiosError
          ? error_.response?.data ?? error_.message
          : error_;
        reject(error);
      });
  });

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('[Fetch Mutator] Request was cancelled');
  };

  return promise;
};
