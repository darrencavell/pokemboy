import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  link: new createHttpLink({
    uri: process.env.REACT_APP_GQL_HOST,
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemons: {
            keyArgs: false,
            merge(existing, incoming) {
              const existingData = existing?.results || [];
              const incomingData = incoming?.results || [];

              return {
                ...incoming,
                results: [
                  ...existingData,
                  ...incomingData
                ]
              }
            }
          }
        }
      },
    }
  })
});

export default client;
