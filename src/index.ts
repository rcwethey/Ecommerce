import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { corsConfig } from "./Config/corsConfig";
import express from 'express';
import { PORT } from './Config/config.json';
import { buildSchema } from "type-graphql";
import { ApolloServer } from 'apollo-server-express';
import { sessionConfig } from './Config/sessionConfig';
import { Resolvers } from './resolvers';

/**
  * Needs - connect to a Database 🔥
  * Needs - Resolvers 🔥
  * Needs - Express 🔥
  * Needs - build scheme for typeGraphQL 🔥
  * Needs - Apollo Server to use GraphQL through middleware 🔥
  * Needs - Cors 🔥
  * Needs - Session and redis store usage 🔥
  * Needs - Redis for Caching data from db 🔥
  * Needs - App listening to port 🔥
*/

const main = async () => {
  await createConnection().then(() => {
    console.log("MongoDB Database Connected! 🔥")
  }).catch((error: any) => console.log(error));

  const app = express();
  const schema = await buildSchema({ resolvers: [Resolvers] })
  const server = new ApolloServer({ schema, context: ({ req }: any) => ({ req }) })
  app.use(corsConfig, sessionConfig)
  server.applyMiddleware({ app })
  app.listen(PORT, () => { console.log(`App is listening to post ${PORT}`) })
}

main();
