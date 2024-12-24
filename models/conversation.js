const mongoose = require("mongoose");
const BaseEntitySchema = require("./BaseEntity");

// SubCategory Schema
const SubCategorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  categoryId: {
    type: String, // Could reference Category
  },
  iconUrl: {
    type: String,
  },
  averageRating: {
    type: Number,
    min: 0,
    max: 5,
  },
});

// Category Schema
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  iconUrl: {
    type: String,
  },
  categoryType: {
    type: String,
    enum: ['PROFILE_INFO', 'INTERESTS'], // Example enum
  },
  imageUrl: {
    type: String,
  },
  bgColor: {
    type: String,
  },
  onBgColor: {
    type: String,
  },
  borderColor: {
    type: String,
  },
});

// Conversation Schema
const ConversationSchema = new mongoose.Schema({
  ...BaseEntitySchema.obj,
  name: {
    type: String,
  },
  status: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  conversationType: {
    type: String,
    enum: ["FRIEND", "MATCH", "LOBBY", "SQUAD", "HOUSE"],
    default: "FRIEND",
  },
  participants: [
    {
      type: String,
      ref: "Users",
    },
  ],
  description: {
    type: String,
  },
  admins: [
    {
      type: String,
      ref: "Users",
    },
  ],
  showMessagesFromDate: [
    {
      userId: {
        type: String,
        ref: "Users",
        default: null,
      },
      dateField: {
        type: Date,
        default: null,
      },
    },
  ],
  lastMessage: {
    type: String,
  },
  lastMessageTime: {
    type: Date,
    default: null,
  },
  categories: [CategorySchema], // Embed Category schema
  subCategories: [SubCategorySchema], // Embed SubCategory schema
  unreadCounts: {
    type: Map, // Map of userId -> unread count
    of: Number,
    default: {},
  },
  onChatScreen: {
    type: Map,
    of: Boolean,
    default: {},
  },
});

const Conversation = mongoose.model("Conversations", ConversationSchema);
module.exports = Conversation;
