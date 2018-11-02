const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var Chat = new Schema({

    Order: {
        type: Schema.Types.ObjectId
        ,ref: 'Order'
    },
    CreatedOn:{
        type: Date
    },
    EndedOn:{
        type:Date
    },
    HasFeedback:{
        type: Boolean
    },
    Messages: []
},{
    collection: 'chats'
})
module.exports = mongoose.model('Chat',Chat);