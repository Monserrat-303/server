 const { AuthenticationError, UserInputError } = require('apollo-server')

const Chat = require('../../models/chatSchema')
const checkAuth = require('../../util/check-auth')

module.exports = {
    Query: {
        async getChats() {
            try {
                const chats = await Chat.find().sort({ createdAt: -1 });
                return chats;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getChat(_, { chatId }) {
            try {
                const chat = await Chat.findById(chatId)
                if (chat) {
                    return chat
                } else {
                    throw new Error('Chat not found')
                }
            }
            catch (err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async createChat(_, { body }, context) {
            const user = checkAuth(context);

            const newChat = new Chat({
                body,
                user: user.id,
                name: user.name,
                createdAt: new Date().toISOString()
            });

            const chat = await newChat.save();

            return chat;
        },
        async deleteChat(_, { chatId }, context) {
            const user = checkAuth(context);

            try {
                const chat = await Chat.findById(chatId);
                if (user.name === post.name) {
                    await chat.delete();
                    return 'Chat deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async reactionChat(_, { chatId }, context)
        {
            const { name } = checkAuth(context)

            const chat = await Chat.findById(chatId)
            if(chat){
                if(chat.reactions.find(reaction => reaction.name === name)){
                    //Está reaccionado, desreaccionalo
                    chat.reactions = chat.reactions.filter(reaction => reaction.name !== name)
                } else{
                    //NNo está reaccionado, reaccionalo
                    chat.reactions.push({
                        name,
                        createdAt: new Date().toISOString()
                    })
                }

                await chat.save()
                return chat
            } else{
                throw new UserInputError('Chat not found')
            }
        }
    }
};
