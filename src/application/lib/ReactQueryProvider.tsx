import { QueryClient, QueryClientProvider } from 'react-query';

const minutes = 60 * 1000;

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * minutes,
      },
    },
  });

let reactQueryClient: QueryClient;
export const getReactQueryClient = (): QueryClient => {
  if (!reactQueryClient) {
    reactQueryClient = createQueryClient();
  }
  return reactQueryClient;
};

export const ReactQueryProviders = ({ children }: { children: any }) => {
  return (
    <QueryClientProvider client={createQueryClient()}>
      {children}
    </QueryClientProvider>
  );
};
