import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import mongoose from 'mongoose';

const MONGODB = "mongodb+srv://group25:group25@cluster0.zajpvsz.mongodb.net/?retryWrites=true&w=majority"


async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  mongoose.connect(MONGODB)
    .then(() => {
      console.log("Dette gikk");
    });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at ${url}`);
}

startApolloServer();