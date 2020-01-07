var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var database = require('../config/database')
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String,
    pipi: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  pipi: () => {
      return '¿QUE HACES PIPI?';
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:3000/graphql');