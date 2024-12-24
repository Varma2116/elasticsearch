const mongoose = require("mongoose");
const BaseEntitySchema = require("./BaseEntity");

const AnnouncementSchema = new mongoose.Schema({
    ...BaseEntitySchema.obj,
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    media: [
        {
            type: String,
        },
    ],
    houseId: {
        type: String,
    },
    reactionCounts: {
        type: Map,
        of: Number,
        default: {},
    },
    createdBy: {
        userName: {
            type: String,
        },
        email: {
            type: String,
        },
        profilePicture: {
            type: String,
        },
    },
}, { timestamps: true });

const Announcement = mongoose.model("announcements", AnnouncementSchema);
module.exports = Announcement;
