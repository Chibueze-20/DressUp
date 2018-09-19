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

var Request = new Schema({
  Title: {
    type: String
  },
  Description:{
    type: String
  },
  Price: {
    type: String,
    default: 'NGN 3000'
  },
  Images: [{
    type: String
  }],
  Schedule: {
    Duration: {
      type: Number
    },
    Milestones: [{
      Milestone: {
        type: String
      },
      Duration: {
        type: Number
      },
    }]
  },
  Conditions: {
    Negotiable: {
      type: String,
    },
    BOYM: {
      type: String,
    },
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
  Tailor: {
    type: Schema.Types.ObjectId,
    rel: "User"
  },
  User: {
    type: Schema.Types.ObjectId,
    rel: "User"
  },
  Sizes: [{
    Name: {
      type: String
    },
    Value: {
      type: String
    }

  }],
  valid: {
    type: Boolean,
    default: false
  },
  completed: {
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

module.exports = mongoose.model('Order', Request)
