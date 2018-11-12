const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
var Messages = new Schema({
    To: {
        type: Schema.Types.ObjectId, ref:'User'
    },
    Message:{

    },
    Type:{
        type:String
    }
},{
    collection:'notifications'
})
module.exports = mongoose.model('Message',Messages)