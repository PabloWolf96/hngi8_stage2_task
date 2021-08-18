const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
  name: String,
  title: String,
  messages: String,
  email: String,
});

module.exports = model("Message", MessageSchema);
