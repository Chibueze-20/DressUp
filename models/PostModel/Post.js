const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

const currrentDate = ()=>{
    return new Date().toISOString()
}
var Size = new Schema({
    name: {
        type: String
    },
    value:{
        type: String
    }
})
var Post = new Schema({
    Tailor : {type:Schema.Types.ObjectId, ref: "User"},
    Title: {type: String},
    Picture:[ 
        {type: String}
    ],
    Tags: [
        {type: String}
    ],
    Description:{
        type: String
    },
    Price:{
        type: String
    },
    Conditions:{
        BYOM:{
            type: String
        },
        Negotiable:{
            type: String
        }
    },
    Sizes:{
       
    },
    CreatedAt: {
        type: Date,
        default: currrentDate(),
        once: true
    },
    UpdatedAt: {
        type:Date,
        default: currrentDate()
    }

}, {
    collection: 'posts'
})

module.exports = mongoose.model('Post',Post);
