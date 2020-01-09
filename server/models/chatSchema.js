const { model, Schema } = require('mongoose');

const chatSchema = new Schema({
  body: String,
  name: String,
  createdAt: String,
  messages: [
    {
      body: String,
      name: String,
      createdAt: String
    }
  ],
  reactions: [
    {
      name: String,
      createdAt: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = model('Chat', chatSchema);

/*const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = require("./userSchema");

const reactionSchema = new Schema({
    user: [userSchema],
    value: String
})

const messageSchema = new Schema({
    user: String,
    date: Date,
    text: String,
    images: String,
    reactions: [reactionSchema]
})

const chatSchema = new Schema({
    users: [userSchema],
    messages: [messageSchema]
})

module.exports = chat = mongoose.model("chat", chatSchema);*/