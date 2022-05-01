import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  link: new createHttpLink({
    uri: process.env.REACT_APP_GQL_HOST,
  }),
  cache: new InMemoryCache()
});

export default client;
