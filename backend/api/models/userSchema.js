const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	email: String,
	phone: Number,
	conversations: [Schema.Types.ObjectId],
	groups: [Schema.Types.ObjectId],
	favourites: [Schema.Types.ObjectId],
	images: String

});

module.exports = user = mongoose.model("user", userSchema);