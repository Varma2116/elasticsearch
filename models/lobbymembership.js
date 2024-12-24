const mongoose = require("mongoose");
const BaseEntitySchema = require("./BaseEntity");

const LobbyMembershipSchema = new mongoose.Schema({
    ...BaseEntitySchema.obj,
    userId: { type: String, required: true },
    groupId: { type: String, default: null },
    lobbyId: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isOwner: { type: Boolean, default: false },
    checkedIn: { type: Boolean, default: false },
});

LobbyMembershipSchema.index({ lobbyId: 1, userId: 1 }, { name: "lobby_user_index" });

const lobbyMembership = mongoose.model("lobbyMemberships", LobbyMembershipSchema);

module.exports = lobbyMembership;
