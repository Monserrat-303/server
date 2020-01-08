const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = require("userSchema");

const reactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: userSchema },
  value: String
});

const messageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: userSchema },
  date: Date,
  text: String,
  images: String,
  reactions: [reactionSchema]
});

const chatSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: userSchema }],
  messages: [messageSchema]
});

module.exports = chat = mongoose.model("chat", chatSchema);
