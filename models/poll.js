const mongoose = require("mongoose");
const BaseEntitySchema = require("./BaseEntity");

const PollSchema = new mongoose.Schema({
    ...BaseEntitySchema.obj,
    question: { type: String, required: true },
    multipleAnswers: { type: Boolean, default: false },
    options: [
        {
            text: { type: String, required: true },
            votes: { type: Number, default: 0 },
        },
    ],
    voters: [
        {
            userId: { type: String, required: true },
            optionIndex: { type: Number, required: true },
        },
    ],
    conversationId: { type: String, required: true },
    createdBy: { type: String, required: true },
    expiresAt: { type: Date, default: null },
    lobbyId: { type: String, default: null },
    houseId: { type: String, default: null },
});

// Index for efficient queries
PollSchema.index({ conversationId: 1, createdAt: -1 });

const Poll = mongoose.model("polls", PollSchema);
module.exports = Poll;
