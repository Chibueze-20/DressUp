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
    Tailor : {type:Schema.Types.ObjectId, rel: "User"},
    Title: {type: String},
    Picture:[ 
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
        Men: {
            xs: {type:String,default: 'false'}
        },
        Women:{
            xs: {type:String,default: 'false'}
        },
        Children:{
            xs: {type:String,default: 'false'}
        },
        Toddler:{
            xs: {type:String,default: 'false'}
        },
        Baby:{
            xs: {type:String,default: 'false'}
        }

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
