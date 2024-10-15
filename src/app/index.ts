import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { typeDefs, resolvers } from "./user";

export async function initServer() {
  const app = express();
  const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await graphqlServer.start();

  app.use(
    "/graphql",

    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(graphqlServer)
  );
  return app;
}
