import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAtomValue } from 'jotai/utils';

import { accessTokenAtom } from '$application/lib/auth/store';

export const QueryProvider = (props) => {
  const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_SERVER_ADDRESS}/api/v1/graphql`,
  });
  const token = useAtomValue(accessTokenAtom);

  const authLink = setContext((_) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};
