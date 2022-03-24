import fetch from 'cross-fetch';
import {ApolloClient, InMemoryCache, HttpLink, from} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import Router from 'next/router';
const cache = new InMemoryCache({addTypename: false});
import {BACKEND_URL} from '../constants/config';

export const getTokenWithourBearer = () => {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('token');
    console.log({token});
    return token ? token : '';
  }
  return '';
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('token');
    console.log({token});
    return token ? `Bearer ${token}` : '';
  }
  return '';
};
// const authMiddleware = new ApolloLink((operation, forward) => {
//   // add the authorization to the headers
//   operation.setContext(({headers = {}}) => ({
//     headers: {
//       ...headers,
//       authorization: getToken(),
//     },
//   }));

//   return forward(operation);
// });
const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    graphQLErrors.map(({message, locations, path}) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, path: ${path}`,
      );

      if (message.includes('UNAUTHENTICATED') || message.includes('INVALID')) {
        Router.replace('/login');
      }
    });
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});
const client = new ApolloClient({
  link: from([
    errorLink,
    new HttpLink({
      uri: `${BACKEND_URL}/graphql`,
      credentials: 'include',
      fetch,
    }),
  ]),
  cache,
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    mutate: {
      fetchPolicy: 'no-cache',
    },
  },
});
export default client;
