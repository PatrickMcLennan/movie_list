import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';

import { ApolloServer } from 'apollo-server-express';
import { resolvers } from '../graphql/resolvers/resolvers';
import { typeDefs } from '../graphql/typeDefs';
import { typeDefs as scalarTypeDefs, resolvers as scalarResolvers } from 'graphql-scalars';
import { makeExecutableSchema } from '@graphql-tools/schema';
import knex from '../postgres/knex';

import { config } from 'dotenv';

config({ path: path.resolve(__dirname, `../.env`) });

const corsOptions = {
  origin: `*`,
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    schema: makeExecutableSchema({
      typeDefs: [...scalarTypeDefs, typeDefs],
      resolvers: {
        ...scalarResolvers,
        ...resolvers,
      },
    }),
    context: () => ({
      db: knex,
    }),
  });

  app.use(morgan(`:method :url :status :res[content-length] - :response-time ms`));
  app.use(cors(corsOptions));

  await server.start();
  server.applyMiddleware({ app, path: `/api/graphql` });
  app.listen({ port: process.env.NODE_PORT }, () =>
    console.log(`App is listening on Port ${process.env.NODE_PORT}`)
  );
}

startServer();
