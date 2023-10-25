import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import mongoose from 'mongoose';

const MONGODB =
  'mongodb://admin:gruppe25@it2810-25.idi.ntnu.no:27017/carDatabase?authSource=admin';

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  mongoose.connect(MONGODB).then(() => {
    console.log('MongoDB connected');
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at ${url}`);
}

startApolloServer();
