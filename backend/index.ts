import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import mongoose from 'mongoose';

// Connection link to the MongoDB database
const MONGODB =
// TODO: Add your MongoDB connection link here

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Connect to the MongoDB database
  mongoose.connect(MONGODB).then(() => {
    console.log('MongoDB connected');
  });

  // Start the Apollo server on port 4000
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at ${url}`);
}

startApolloServer();
