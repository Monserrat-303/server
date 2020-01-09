const { gql } = require('apollo-server')

module.exports = gql`
    type Chat{
        id: ID
        body: String
        createdAt: String
        name: String
        messages: [Message]
        reactions: [Reaction]
    }
    type Message{
        id: ID
        createdAt: String
        name: String
        body: String
    }
    type Reaction{
        id: ID
        createdAt: String
        name: String
    }
    type User{
        id: ID
        token: String
        email: String
        name: String
        password: String
        phone: Int
        createdAt: String
    }
    input RegisterInput{
        name: String!
        password: String!
        confirmPassword: String!
        email: String!
        phone: Int!
    }
    type Query{
        getUsers: [User]
        getUser(userId: ID!): User
        getChats: [Chat]
        getChat(chatId: ID!): Chat
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(name: String!, password: String!): User!
        createChat(body: String!): Chat!
        deleteChat(chatId: ID!): String!
        createMessage(chatId: String!, body: String!): Chat!
        deleteMessage(chatId: ID!, messageId: ID!): Chat!
        reactionChat(chatId: ID!): Chat!
    }
`