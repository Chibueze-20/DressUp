const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var User = new Schema({
  Account:{
    Email : {
      type: String,
      required: true,
      unique: true
    },

    Password: {
      type: String,
      required: true,
      select: false
    }
  },
  Role: {
    type: String,
    enum: ['User','Designer'],
    required: true
  },
  Name:{
    FirstName: {
      type: String
    },
    MiddleName: {
      type: String
    },
    LastName: {
      type: String
    }
  },
  Contact:{
    State: {
      type: String
    },
    City: {
      type: String
    },
    HomeAddress: {
      type: String
    },
    PostAddress: {
      type: String
    },
    PhoneNumber: {
      type: String
    }
  },
  Brand: {
    BrandName: {
      type: String
    },
    BrandDescription: {
      type: String
    },
    WorkAddress: {
      type: String
    },
  }
}, {
    collection: 'users'
  })

module.exports = mongoose.model('User',User)
