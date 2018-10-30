const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
var Bid = new Schema({
    Type:{
        type:String,
        enum:['Free','Direct'] // free bid for general bids ans direct bids for direct requests
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
        type: String
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
      }
})
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