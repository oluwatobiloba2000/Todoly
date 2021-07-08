const express = require('express')
const { ApolloServer } =  require("apollo-server-express");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require('subscriptions-transport-ws');
const {json} = require("body-parser");
const { createServer } = require('http');
const typeDef = require('./graphql/schema');
const resolvers  = require('./graphql/resolvers');
const model  = require('./models');
const cors = require('cors')


const isProduction = process.env.NODE_ENV === 'production';

require('dotenv').config();

const app = express();

app.use(cors());
// app.use(express.json());
app.use("/graphql", json())
// if (!isProduction) {
//   app.use(errorhandler());
// }
const apolloServer = new ApolloServer({
  typeDefs: typeDef,
  resolvers: resolvers,
  context: {model},
  // subscriptions
})

apolloServer.applyMiddleware({app})

const server =  createServer(app);


app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

const APP_PORT = process.env.PORT || 3000;


server.listen(APP_PORT, () => {
  new SubscriptionServer({
    execute,
    subscribe,
    schema: typeDef,
  }, {
    server,
    path: '/subscriptions',
  });
  process.stdout.write(`listening on port ${APP_PORT}\n`);
});

module.exports = app;
