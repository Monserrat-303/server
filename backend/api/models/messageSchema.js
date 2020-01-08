const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const message = {
    from: String,
    to: String,
    content: String
}

module.exports = Message = mongoose.model("message", message);