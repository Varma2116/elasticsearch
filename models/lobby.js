const mongoose = require('mongoose');

const LobbyStatus = Object.freeze({
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    OPEN: 'OPEN',
    CLOSED: 'CLOSED',
    REQUESTED: 'REQUESTED',
    SEARCH: 'SEARCH',
    FULL: 'FULL',
});

const lobbySchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
        lobbyStatus: {
            type: String,
            enum: Object.values(LobbyStatus),
            required: true,
        },
        description: { type: String },
        mediaUrls: [{ type: String }], 
        currentMembers: { type: Number, default: 0 }, 
        membersRequired: { type: Number, required: true },
        lobbyType: { type: String, enum: ['PRIVATE', 'PUBLIC'], required: true },
    },
    {
        timestamps: true, 
        collection: 'lobbies', 
    }
);

Object.freeze(LobbyStatus);

const Lobby = mongoose.model('lobbies', lobbySchema);

module.exports = Lobby;
