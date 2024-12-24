const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: [
            'FRIEND_REQUEST',
            'LOBBY_INVITATION',
            'MATCH_NOTIFICATION',
            'LOBBY_EXPIRATION',
            'GROUP_JOINED',
            'CHAT_PENDING',
            'LOBBY_CREATED',
            'INACTIVE_WARNING',
            'NEW_FOLLOWER'
        ],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    targetUserIds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true
    },
    sourceUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    targetLobbyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lobby'
    },
    additionalInfo: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
    },
    channels: {
        type: [String],
        enum: ['EMAIL', 'SMS', 'PUSH'], // replace with actual channels
        required: true
    },
    status: {
        type: String,
        enum: ['READ', 'UNREAD'],
        default: 'UNREAD'
    }
}, {
    collection: 'notifications'
});

const Notification = mongoose.model('notifications', NotificationSchema);

module.exports = Notification;
