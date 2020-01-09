const usersResolver = require('./users')
const chatsResolver = require('./chats')
const messagesResolver = require('./messages')

module.exports = {
    Query: {
        ...usersResolver.Query,
        ...chatsResolver.Query
    },
    Mutation: {
        ...usersResolver.Mutation,
        ...chatsResolver.Mutation,
        ...messagesResolver.Mutation
    }
}