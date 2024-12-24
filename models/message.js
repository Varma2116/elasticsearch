const mongoose = require("mongoose");
const BaseEntitySchema = require("./BaseEntity");
const mongooseAutopopulate = require("mongoose-autopopulate"); // Ensure this is required

const MessageSchema = new mongoose.Schema({
  ...BaseEntitySchema.obj,
  text: { type: String },
  conversationId: {
    type: String,
  },
  attachments: [
    {
      type: String,
    },
  ],
  userId: {
    type: String,
  },
  type: {
    type: String,
    enum: ["","INFO", "LOBBY", "FORM", "ANNOUNCEMENT", "MOMENT", "HOUSE", "ACCESS_REQUEST", "POLL"],
    default: "",
  },
  id: {
      type: String,
  },
});

const Message = mongoose.model("messages", MessageSchema);
module.exports = Message;
