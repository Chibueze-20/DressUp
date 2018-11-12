const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;


var Profile = new Schema({

    Theme: {
        type: String,
        default:'Clay Theme'
    },
    Background:{
        type: String,
        default: '../../assets/images/clark-street-mercantile-33931-unsplash.jpg'
    },
  Display:{
      type: String,
      default: 'assets/images/person-flat.png'
  },
    Tags: [{type: String}],
    Feedbacks:[{type: Schema.Types.ObjectId, ref:'Feedback'}],

},{
    collection: 'profiles'
})

module.exports = mongoose.model("Profile",Profile);
