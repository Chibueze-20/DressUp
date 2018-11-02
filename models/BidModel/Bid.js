const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
var Bid = new Schema({
    Type:{
        type:String,
        enum:['Bid','Direct'], // free bid for general bids and direct bids for direct requests
        default:'Bid'
    },
    Request:{
        type: Schema.Types.ObjectId,
        ref: "Request"
    },
    Tailor: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
    Price: {
        type: Number
      },
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
      Accepted:{
        type:Boolean,
        default:false
      },
      Rejected:{
        type:Boolean,
        default:false
      }
},{
  collection:'bids'
})
Bid.pre('find',function(){
  this.populate('Request');
})
module.exports = mongoose.model('Bid',Bid);
// Bids: [
//     {
//       Duration: {
//           type: Number
//         },
//         Milestones: [{
//           Milestone: {
//             type: String
//           },
//           Duration: {
//             type: Number
//           },
//         }],
//         Price: {
//           type: String
//         }
//     }
// ]