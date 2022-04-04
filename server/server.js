const express = require('express');
const path = require('path');

const { authMiddleware } = require('./utils/auth');
const { ApolloServer } = require('apollo-server-express');

// Import the two parts of a GraphQL schema
const {typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { type } = require('express/lib/response');
const { isContext } = require('vm');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// create new Apollo Server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`)
      console.logt(`Use GraphQL at http://localhost:${PORT}${server.graphqlPatch}`)
    });
  })
}

startApolloServer(typeDefs, resolvers);



