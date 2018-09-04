const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var Size = new Schema({
  name: {
      type: String
  },
  value:{
      type: String
  }
})

var CustomSize = new Schema({
  Label:{
      type: String
  },
  Sizes: [Size]
})

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
  },
  CustomSizes: [CustomSize],
  Ratings:{
    Stars:{
      type: Number,
    },
    Ratedby:{
      type: Number,
    },
    AvgRating:{
      type: Number,
    }
  }
}, {
    collection: 'users'
  })
  User.statics.feedback = function(id,cb){
    return this.findById(id,cb)
   }

module.exports = mongoose.model('User',User)
