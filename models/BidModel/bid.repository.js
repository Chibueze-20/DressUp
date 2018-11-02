var Bid = require('./Bid')
var Order = require('../OrderRequestModel/OrderRequest.repository');
exports.createBid = function (res,tailor,request,price) { 
    let bid = new Bid({Tailor:tailor,Request:request,Type:'Direct'})
    if(price){
        bid.Price = price;
    }
    bid.save(function (err,bid) { 
        if (err) {
            return res.status(505).json({Message:"bid not sent"})
        }else{
            res.status(200).json({Message:'Bid sucessfully sent'})
        }
     })
 }
exports.PlaceBid = function(req,res){
    let bid = new Bid(req.body)
    bid.save(function (err,bid) { 
        if (err) {
            return res.status(505).json({Message:"bid not sent"})
        }else{
            res.status(200).json({Message:'Bid sucessfully sent'})
        }
     })
}
exports.AcceptBid = function (req,res) { 
    Bid.findById(req.params.id,function(err,bid){
        if (err) {
            return res.status(404).json({Message:"Bid not found"});
        }else{
            Bid.updateMany({Request:bid.Request,Accepted:false},{Rejected:true},function(err,update){
                if (err) {
                    return res.status(504).json({Message:"Ran into some problem accepting bid"});
                }else{
                    console.log('updated documents',update)
                }
            })
            bid.Accepted = true;
            bid.save(function(err,newBid){
                if (err) {
                    return res.status(504).json({Message:"Ran into some problem accepting bid"});
                }else{
                    Order.createRequest(res,newBid._id);
                }
            });
        }
    })
 }
 exports.RejectBid = function(req,res){
     Bid.findByIdAndUpdate(req.params.id,{Rejected:true})
     .exec(function (err,bid) { 
         if (err) {
            return res.status(404);
         } else {
             return res.status(200).json({Message:"Bid rejected"});
         }
      })
 }
exports.showBids = function(req,res) {
    Bid.find({Type:'Bid',Accepted:false,Rejected:false})
    .populate('Request')
    .exec(function(err,bids){
        if (err) {
            return res.status(404);
        }else{
            res.send(bids);
        }
    });
}
//shows all direct bids by a particular tailor often a response to an incomplete order such as direct order or post order
exports.showDirectBids = function(req,res){
    Bid.find({Tailor:req.params.tailor,Type:'Direct',Accepted:false,Rejected:false})
    .populate('Request')
    .exec(function(err,bids){
        if (err) {
            return res.status(404);
        }else{
            res.send(bids);
        }
    });
}

exports.AcceptDirectBid = function(req,res,next){
    Bid.findByIdAndUpdate(req.params.id,req.body,{new:true},function (err,bid) { 
        if (err) {
            return res.status(404).send(err)
        }else{
            bid.Accepted = true;
            bid.save(function(err,BID){
                if (err) {
                    return res.status(500).send(err)
                } else {
                    Order.createRequest(res,BID._id);
                }
            })
        }
     })
}