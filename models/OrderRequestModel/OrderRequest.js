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
    Orders: [Order],
    Price: {
        type: String,
        default: 'NGN 3000'
    },
    Conditions:{
        Negotiable: {
            type: String,
            default: 'true'
        },
        Duration: {
            type: String,
            default: '5 days'
        },
        Bulk:{
            type: String,
            default: '1'
        }
    },
    Title: {
        type: String,
        default: 'A shirt worthy of a king'
    },
    Kind: {
        type: String,
        default: 'Bid'
    }

},
{
    collection: 'orders'
})

module.exports = mongoose.model('Order',Request)