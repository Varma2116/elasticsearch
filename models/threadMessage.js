const mongoose = require("mongoose");
const mongooseAutopopulate = require('mongoose-autopopulate');
const ThreadMessageSchema = new mongoose.Schema({
    messageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Messages",  
        required: true,
        autopopulate: {
            select: 'text userId attachments'  
        }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users", 
        autopopulate: {
            select: 'name email profilePicture'  
        }
    },
    text: {
        type: String,
        required: true,
    },
    attachments: [
        {
            type: String,
        },
    ],
    createdDate: {
        type: Date,
        default: Date.now
    },
});

ThreadMessageSchema.plugin(mongooseAutopopulate);

const ThreadMessage = mongoose.model("threadMessages", ThreadMessageSchema);
module.exports = ThreadMessage;
