const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

const currrentDate = ()=>{
    return new Date().toISOString()
}
var Feedback  = new Schema({

    User:{
        type: Schema.Types.ObjectId
        ,ref: 'User'
    },
    Tailor:{
        type: Schema.Types.ObjectId
        ,ref: 'User'
    },
    Message:{
        type: String
    },
    Rating:{
        type: Number,
        max: 5,
        min:0
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
},{
    collection: 'feedbacks'
})
Feedback.pre('find',function(next){
    this.populate({
        path: 'User',
        select: 'Name'
    });
    next();
});
module.exports = mongoose.model("Feedback",Feedback)