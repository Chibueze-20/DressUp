var Request = require('./Request')
var Bid = require('../BidModel/bid.repository');
exports.CreateRequest = function(req,res,next){
    let request = new Request(req.body.request);
    request.CreatedAt = new Date();
    request.Picture = req.body.pic;
    if(req.body.tags){
        request.Tags = req.body.tags;
    }
    request.save( function(err, request){
        if(err){
            return res.staus(400)
        }
        if(req.body.tailor){
            if(req.body.price){
                Bid.createBid(req.body.tailor,request._id,req.body.price);
            }else{
                Bid.createBid(req.body.tailor,request._id);
            }
        }
        return res.status(200).json({Message:'Request sucessfully sent'});
    }) 
}

exports.findRequest = function(req, res, next){
    Request.find({User: req.params.user})
    .exec(function(err,requests){
        if(err){
            return res.status(404).send(err)
        }
        res.send(requests);
    })
}

exports.findRequestbyID = function(req, res, next){
    Request.findById(req.body.ID)
    .exec(function(err,requests){
        if(err){
            return res.status(404).send(err)
        }
        res.send(requests);
    })
}

exports.findAllBids = function(req,res,next){
    Request.find({IsAccepted: false, Type:'Bid'})
    .skip(Number(req.params.skip||0))
    .limit(20)
    .sort('-CreatedAt')
    .exec(function(err,requests){
        if(err){
            return res.status(404).send(err)
        }
        res.send(requests);
    })
}
// gets all direct requests 
exports.getDirectOrders = function(req,res){
    Request.find({Type:"Direct"}).exec(function(err, order){
        if(err){
            return res.status(404).send(err);
        }
        res.json(order)
    })
}
// all request
exports.allrequests = function(req,res,next){
    Request.find()
    .sort('-CreatedAt -_id')
    .exec(function(err,posts){
        if(err){
            res.status(400).json(err);
        }else{
            res.json(posts);
        }
    })
}
exports.acceptRequest = function(id){
    let Req;
    Request.findByIdAndUpdate(id,{IsAccepted:true},{new:true},function (err,request) { 
        if(err){
            return null;
        }else{
            Req = request;
        }
     });
     return Req;
}
// exports.countBids = function(){
//     let acceptedBids = 0
//     let allBids = 0

//     Request.count({IsAccepted:true}).exec(function(err,number){
//         let count;
//         if(err || number === null){
//             count = 0
//         }else{
//             count = number;
//         }
//         acceptedBids = count;
//     })
//     Request.count({IsAccepted:false}).exec(function(err,number){
//         let count;
//         if(err || number === null){
//             count = 0
//         }else{
//             count = number;
//         }
//         allBids = count;
//     })
//     let bidcount = {
//         closedBids: acceptedBids,
//         openBids: allBids,
//         totalBids: acceptedBids + allBids
//     }
//     return bidcount;
// }
// exports.countBidsbyUser = function(id){
//     let acceptedBids = 0
//     let allBids = 0

//     Request.countDocuments({IsAccepted:false, User:id}).exec(function(err,number){
//         let count;
//         if(err){
//             count = err;
//         }else{
//             count = number;
//         }
//         acceptedBids = count;
//     })
//     Request.countDocuments({}).exec(function(err,number){
//         let count;
//         if(err){
//             count = err
//         }else{
//             count = number;
//         }
//         allBids = count;
//     })
//     let bidcount = {
//         closedBids: acceptedBids,
//         openBids: allBids,
//     }
//     return bidcount;
// }