import { ApolloClient, InMemoryCache } from "@apollo/client";

export const locationsClient = new ApolloClient({
    uri: 'https://flyby-router-demo.herokuapp.com/',
    cache: new InMemoryCache(),
  });

  export const spaceXClient = new ApolloClient({
    uri: 'https://spacex-production.up.railway.app/',
    cache: new InMemoryCache(),
  });