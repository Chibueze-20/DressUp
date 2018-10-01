const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;


var Profile = new Schema({

    Theme: {
        type: String,
        default:'Default Theme'
    },
    Background:{
        type: String
    },
    Tags: [{type: String}],
    Feedbacks:[{type: Schema.Types.ObjectId, ref:'Feedback'}],

},{
    collection: 'profiles'
})

module.exports = mongoose.model("Profile",Profile);