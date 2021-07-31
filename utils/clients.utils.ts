import axios from 'axios';
import { GraphQLClient } from 'graphql-request';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import fetch from 'node-fetch';

/**
 * TODO:
 * change urls when configured
 */

export const browserClient = axios.create({
  baseURL: `http://localhost:4000`,
});

export const nodeGraphQl = new GraphQLClient(`http://localhost:4000/api/graphql`);

export const clientGraphQl = new ApolloClient({
  uri: `http://localhost:4000/api/graphql`,
  cache: new InMemoryCache(),
});
