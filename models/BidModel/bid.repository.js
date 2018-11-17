var Bid = require('./Bid');
var Request = require('../RequestModel/Request');
var Order = require('../OrderRequestModel/OrderRequest.repository');
var mongoose = require('mongoose');

exports.createBid = function (tailor,request,price) { 
    let bid = new Bid({Tailor:tailor,Request:request,Type:'Direct'})
    if(price){
        bid.Price = price;
    }
    bid.save(function (err,bid) { 
        if (err) {
            console.log(err);
        }else{
           console.log(bid);
        }
     })
 }
exports.PlaceBid = function(req,res){
    let bid = new Bid(req.body)
    bid.save(function (err,bid) { 
        if (err) {
            return res.status(500).json({Message:"bid not sent",Error:err})
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
            Bid.updateMany({Type:'Bid',Request:bid.Request,Accepted:false},{Rejected:true},function(err,update){
                if (err) {
                    return res.status(504).json({Message:"Ran into some problem accepting bid"});
                }else{
                    console.log('updated documents',update)
                }
            })
            Bid.findByIdAndUpdate(bid._id,{Accepted:true,Rejected:false},{new:true},function(err,newBid){
                if (err) {
                    return res.status(504).json({Message:"Ran into some problem accepting bid"});
                }else{
                    console.log(newBid);
                    Order.createRequest(res,newBid._id);
                    return res.status(200).json({Message:"Bid accepted"});
                }
            })
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
    Request.find({Type:'Bid',User:mongoose.Types.ObjectId(req.params.user)},function(err,requests){
        if(err){
            console.log(err);
            return res.status(404);
        }else{
        //  console.log(requests.map(elem => elem._id));
         let request = requests.map(elem => elem._id);
         Bid.find({Type:'Bid',Accepted:false,Rejected:false})
         .where('Request').in(request)
         .exec(function(err,bids){
             if (err) {
                 return res.status(404);
             }else{
                 res.send(bids);
             }
         });
        }
    })
    
}
//shows all direct bids to a particular tailor often a response to an incomplete order such as direct order or post order
exports.showDirectBids = function(req,res){
    Bid.find({Tailor:req.params.tailor,Type:'Direct',Accepted:false,Rejected:false})
    .exec(function(err,bids){
        if (err) {
            return res.status(404);
        }else{
            res.send(bids);
        }
    });
}

exports.AcceptDirectBid = function(req,res,next){
    let body;
    if(req.body.Update.Price){
       body = {Price:req.body.Update.Price,Schedule:req.body.Update.Schedule,Accepted:true}
    }else{
        body = {Schedule:req.body.Update.Schedule,Accepted:true}
    }
    Bid.findByIdAndUpdate(req.body.Id,body,{new:true},function (err,bid) { 
        if (err) {
            return res.status(404).send(err)
        }else{
            Order.createRequest(res,bid._id);
            return res.status(200).json({Message:"Bid accepted"});
        }
     })
}