//Structure out entities
// Order request
// [Order{Description, Sizes, Picture}]
// Price
// Conditions

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
const currrentDate = () => {
  return new Date().toISOString()
}

var Order = new Schema({
  
  Order:{
    type: Schema.Types.ObjectId,
    ref: "Bid"
  },
  Sizes: [{
    Size: {
      type: String
    },
    Value: {
      type: String
    }

  }],
  Valid: {
    type: Boolean,
    default: false
  },
  Completed: {
    type: Boolean,
    default: false
  },
  CreatedAt: {
    type: Date,
    default: currrentDate(),
    once: true
  },
  CompletedOn: {
    type: Date
  }
}, {
  collection: 'orders'
})

module.exports = mongoose.model('Order', Order)
