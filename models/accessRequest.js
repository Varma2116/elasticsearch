const mongoose = require("mongoose");
const BaseEntitySchema = require("./BaseEntity");

const AccessRequestSchema = new mongoose.Schema({
    ...BaseEntitySchema.obj,
    userId: { type: String, index: true },
    lobbyId: { type: String, required: true },
    groupId: { type: String, index: true },
    lobbyName: { type: String },
    status: { 
        type: String, 
        enum: ["ACTIVE", "REQUESTED", "REQUEST_ACCEPTED", "CANCELLED", "FAILED", "SUCCESS", "REQUEST_DENIED", "INTERNAL"] 
    },
    text: { type: String },
    form: { type: mongoose.Schema.Types.Mixed },
    lobbyType: { type: String, enum: ["TYPE1", "TYPE2"] },
    response: { type: String },
    adminUserId: { type: String },
});

AccessRequestSchema.index({ lobbyId: 1, userId: 1 }, { name: "lobby_user_index" });
AccessRequestSchema.index({ lobbyId: 1, groupId: 1 }, { name: "lobby_group_index" });
AccessRequestSchema.index({ lobbyId: 1, status: 1 }, { name: "lobby_status_index" });

const AccessRequest = mongoose.model("accessRequests", AccessRequestSchema);
module.exports = AccessRequest;