import fetch from 'cross-fetch';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  from,
} from '@apollo/client';
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
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({headers = {}}) => ({
    headers: {
      ...headers,
      // authorization: getToken(),
    },
  }));

  return forward(operation);
});
const client = new ApolloClient({
  link: from([
    authMiddleware,
    new HttpLink({
      uri: `${BACKEND_URL}/graphql`,
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
