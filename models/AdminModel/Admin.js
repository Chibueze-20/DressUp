const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var Admin = new Schema({
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
        enum: ['Full','Half'],
        required: true
      }
},
{
    collection: 'admin'
})

module.exports = mongoose.model('Admin',Admin);