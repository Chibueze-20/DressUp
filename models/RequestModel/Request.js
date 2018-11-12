const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var Request = new Schema({
    User: {type:Schema.Types.ObjectId, ref: "User"},
    Title: {
        type: String
    },
    Picture:[ 
        {type: String}
    ],
    Tags: [
        {type: String}
    ],
    Description:{
        type: String
    },
    Schedule: {
        Duration: {
          type: Number
        }
    },
    Conditions: {
        Delivery: {
          type: String,
        },
        Fitness: {
          type: String
        }
      },
      Type: {
        type: String,
        default: 'Bid'
      },
      CreatedAt: {
        type: Date,
        once: true
      },
      IsAccepted:{
        type: Boolean,
        default: false
      }
}, {
    collection: 'requests'
  })
  
  module.exports = mongoose.model('Request', Request)
  