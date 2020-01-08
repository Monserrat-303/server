var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var database = require('../config/database')
var users = require('./models/userSchema')
var Message = require('./models/messageSchema')
var User = users;

function createUser(newName) {
const newUser = new User({
  name: newName
})
newUser.save();
}

function createMessage(from, to, content) {
  const newMessage = new Message({
    from: from,
    to: to,
    content: content
  })
  newMessage.save();
}


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`

type User {
  name: String
}

type Message {
  from: String,
  to: String,
  content: String
}

type Mutation {
  setUser(name: String): User
  setMessage(from: String, to: String, content: String): Message
}

  type Query {
    hello: String,
    pipi: String,
    users: [User],
    messages: [Message]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  pipi: () => {
      return '¿QUE HACES PIPI?';
    },
  users: async () => { var pipi = await users.find({})
   return pipi
  },
  messages: async () => { var messages = await Message.find({})
   return messages
  },
  setUser:({name}) => { createUser(name)},
 
  setMessage: ({from, to, content}) =>{createMessage(from, to, content)}

  }            
    
;

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:3000/graphql');