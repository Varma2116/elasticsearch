const mongoose = require("mongoose");
const BaseEntitySchema = require("./BaseEntity");

const MomentSchema = new mongoose.Schema({
    ...BaseEntitySchema.obj,
    title: { type: String },
    description: { type: String },
    media: [{ type: String }],
    lobbyId: { type: String },
    houseId: { type: String },
    userId: { type: String },
    reactionCounts: { type: Map, of: Number, default: {} },
    createdBy: {
        userId: { type: String },
        name: { type: String },
        email: { type: String },
        profilePicture: { type: String },
    },
});

const Moment = mongoose.model("moments", MomentSchema);
module.exports = Moment;
