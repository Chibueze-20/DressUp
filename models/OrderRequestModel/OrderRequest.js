//Structure out entities
// Order request
// [Order{Description, Sizes, Picture}]
// Price
// Conditions

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var Order = new Schema({
    Description: {
        type: String,
        required: true,
        default : 'A sample description on how i want my dress'
    },
    Sizes: [{
        name: {
            type: String,
            default: 'neck'
        },
        size:{
            type: String,
            default: '35'
        }
        
    }],
    Picture: {
        type: String,
        default: 'assets/images/clem-onojeghuo-197847-unsplash.jpg'
    }
    
})
var Request = new Schema({
   Title: {
       type: String
   },
    Price: {
        type: String,
        default: 'NGN 3000'
    },
    Images: [{type: String}],
    Schedule:{
        Duration:{
            type: Number
        },
        Milestones:[{
            Milestone:{type: String},
            Duration:{type: Number},
        }]
    },
    Conditions:{
        Negotiable: {
            type: String,
        },
        BOYM: {
            type: String,
        },
        Delivery:{
            type: String,
        },
        Fitness:{
            type: String
        }
    },
    Type: {
        type: String,
        default: 'Bid'
    },
    Tailor : {type:Schema.Types.ObjectId, rel: "User"},
    User : {type:Schema.Types.ObjectId, rel: "User"},
    Sizes:[{
        Name: {type: String},
        Value: {type: String}

    }
]
},
{
    collection: 'orders'
})

module.exports = mongoose.model('Order',Request)