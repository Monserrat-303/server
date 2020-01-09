const { AuthenticationError, UserInputError } = require('apollo-server')

const checkAuth = require('../../util/check-auth')
const Chat = require('../../models/chatSchema')

module.exports = {
    Mutation: {
        createMessage: async (_, { chatId, body }, context) => {
            const { name } = checkAuth(context)
            if(body.trim() === ''){
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment body must not empty'
                    }
                })
            }

            const chat = await Chat.findById(chatId)

            if(chat){
                chat.messages.unshift({
                    body,
                    name,
                    createdAt: new Date().toISOString()
                })
                await chat.save()
                return chat
            }
            else throw new UserInputError('Chat not found')
        },
        async deleteMessage(_, { chatId, messageId }, context){
            const { name } = checkAuth(context)

            const chat = await Chat.findById(chatId)
            if(chat){
                const messageIndex = chat.messages.findIndex(m => m.id === messageId)

                if(chat.messages[messageIndex].name === name)
                {
                    chat.messages.splice(messageIndex, 1)
                    await chat.save()
                    return chat
                } else{
                    throw new AuthenticationError('Action not allowed')
                }
            } else{
                throw new UserInputError('Chat not found')
            }
        }
    }
}