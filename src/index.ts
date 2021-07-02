import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { corsConfig } from "./Config/corsConfig";
import express from 'express';
import { PORT } from './Config/config.json';
import { buildTypeDefsAndResolvers } from "type-graphql";
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { sessionConfig } from './Config/sessionConfig';
import { Resolvers } from './resolvers/index';
import { typeDefs } from './resolvers/typeDefs'

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

  //Replace "Resolvers" with actual Resolver in an Array 
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({ resolvers: ["Resolvers"] })
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const server = new ApolloServer({ schema, context: ({ req }: any) => ({ req }) })
  app.use(corsConfig, sessionConfig)
  server.applyMiddleware({ app })
  app.listen(PORT, () => { console.log(`App is listening to post ${PORT}`) })
}

main();
