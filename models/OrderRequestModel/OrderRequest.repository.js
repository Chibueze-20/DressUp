var OrderRequest = require('./OrderRequest');
var Chat = require('../ChatModel/chat');
var Bid = require('../BidModel/bid.repository');
var Request = require('../RequestModel/request.repository');
// create request direct or bid
exports.createRequest = function(res,id){
    let Order = new OrderRequest();
    Order.Order = id;
    Order.CreatedAt = new Date();
    Order.save(function(err,Orders){
        if (err) {
            console.log(err)
        }
        let newChat = new Chat()
        newChat.Order = Order._id
        newChat.save(function(err, chat){
            if (err) {
                console.log(err)
            }
            console.log({Message: 'Order sucessfully created', type: 'Success'})
        });
        
    });
}
// all Order ongoing
exports.allrequests = function(req,res,next){
    OrderRequest.find({Completed:false})
    .sort('-CreatedAt -_id')
    .exec(function(err,posts){
        if(err){
            res.status(400).json(err);
        }else{
            res.json(posts);
        }
    })
}

// exports.getInvalidOrders = function(req,res,next){
//     OrderRequest.find({Valid:false})
//     .populate({
//         path:"Order",
//         populate:{
//             path:'Tailor',
//             select:'Brand.BrandName'
//         }
//     })
//     .populate('Request')
// }

// update order
exports.updateOrder = function(req,res){
    OrderRequest.findByIdAndUpdate(req.params.id,req.body,{new:true}).exec(function (err, update) {
        if (err) {
            return res.status(404).send(err);
        }
        res.json({Message: "Update done", type: "Success"});
    })
}

//update sizes
exports.updateSize = function(req,res){
    OrderRequest.findById(req.params.id,function(err,order){
        if (err) {
            return res.status(404).send(err); 
        }
        order.Sizes.push(req.body)
        order.save(function(err,orders){
            if(err){
                return res.status(504).send(err);
            }
            res.status(200).send({Message:'Updated Size',type:'Success'})
        })
    })
}

// gets a specified request or order
exports.getOrder = function(req,res){
    OrderRequest.findById(req.params.id)
    .populate('Order')
    .populate('Request')
    .exec(function(err, order){
        if(err){
            return res.status(404).send(err);
        }
        res.json(order)
    })
}
exports.getOrderByUser =  function(req,res){
    OrderRequest.find({Completed:false})
    .populate({
        path:'Order',
        populate:{
            path:'Tailor',
            select:'Brand.BrandName'
        }
    })
    .populate('Request')
    .sort('-CreatedAt -_id')
    .exec(function(err, order){
        if(err){
            return res.status(404).send(err);
        }
        res.send(order)
        
    })
}
// show all bids
// exports.getAllOrders = function(req,res,next){
//     OrderRequest.find({Type:'Bid'})
//     .sort('-CreatedAt -_id')
//     .skip(Number(req.params.skip))
//     .limit(20)
//     .exec( function(err, users){
//         if(err){
//          return  res.send(err);
//         }
//         res.json(users);
//     })
// }
// gets all requests directed to a tailor
// exports.getDirectOrders = function(req,res){
//     OrderRequest.find({Tailor:req.params.tailor,Type:"Direct"}).exec(function(err, order){
//         if(err){
//             return res.status(404).send(err);
//         }
//         res.json(order)
//     })
// }
exports.CountOrders = function(){
    let doneOrders = 0;
    let ongoingOrders = 0;
    OrderRequest.count({Completed:true}).exec(function(err,number){
        if(err || number === null){
            count = 0;
        }else{
            count = number;
        }
        doneOrders = count;
    })
    OrderRequest.count({Completed:false}).exec(function(err,number){
        if(err || number === null){
            count = 0;
        }else{
            count = number;
        }
        ongoingOrders = count;
    })
    let OrderCount = {
        Completed: doneOrders,
        Ongoing: ongoingOrders
    }
    return OrderCount;
}
exports.CountOrdersbyUser = function(id,role){
    let doneOrders = 0;
    let ongoingOrders = 0;
    if(role === 'User'){
        OrderRequest.count({Completed:true, User:id}).exec(function(err,number){
            if(err || number === null){
                count = 0;
            }else{
                count = number;
            }
            doneOrders = count;
        })
        OrderRequest.count({Completed:false, User:id}).exec(function(err,number){
            if(err || number === null){
                count = 0;
            }else{
                count = number;
            }
            ongoingOrders = count;
        })
    } else if(role === 'Designer'){
        OrderRequest.count({Completed:true, Tailor:id}).exec(function(err,number){
            if(err || number === null){
                count = 0;
            }else{
                count = number;
            }
            doneOrders = count;
        })
        OrderRequest.count({Completed:false, Tailor:id}).exec(function(err,number){
            if(err || number === null){
                count = 0;
            }else{
                count = number;
            }
            ongoingOrders = count;
        })
    }
    let OrderCount = {
        Completed: doneOrders,
        Ongoing: ongoingOrders
    }
    return OrderCount;
}
