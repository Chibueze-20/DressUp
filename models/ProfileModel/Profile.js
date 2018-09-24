const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;


var Profile = new Schema({

    Theme: {
        type: String
    },
    Background:{
        type: String
    },
    Font:{
        type: String
    },
    Feedbacks:[{type: Schema.Types.ObjectId, rel:'Feedback'}],

},{
    collection: 'profiles'
})

module.exports = mongoose.model("Profile",Profile);