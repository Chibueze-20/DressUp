const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var Notifications = new Schema({
    User: {
        type: Schema.Types.ObjectId, ref:'User'
    },
    Endpoint:{

    },
    UserRole:{
    type: String,
    enum: ['User','Designer']
  }
},{
    collection:'notifications'
})
module.exports = mongoose.model('Notification',Notifications)