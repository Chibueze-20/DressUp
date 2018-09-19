var OrderRequest = require('./OrderRequest');

// create request direct or bid
exports.createRequest = function(req,res){
    let request = new OrderRequest(req.body)
    request.save(function(err,request){
        if (err) {
            return res.status(400).send(err);
        }
        res.json({Message: 'request sucessfully created', type: 'Success'})
    })
}

// show all bids
exports.getAllOrders = function(req,res,next){
    OrderRequest.find({Type:'Bid'})
    .sort('-CreatedAt')
    .skip(Number(req.params.skip))
    .limit(20)
    .exec( function(err, users){
        if(err){
         return  res.send(err);
        }
        res.json(users);
    })
}

// update order
exports.updateOrder = function(req,res){
    OrderRequest.findOneAndUpdate({_id: req.params.id},req.body,{new:true}).exec(function (err, update) {
        if (err) {
            return res.status(404).send(err);
        }
        res.json({Message: "Update done", type: "Success"});
    })
}

// gets a specified request or order
exports.getOrder = function(req,res){
    OrderRequest.findById(req.params.id).exec(function(err, order){
        if(err){
            return res.status(404).send(err);
        }
        res.json(order)
    })
}
// gets all requests directed to a tailor
exports.getDirectOrders = function(req,res){
    OrderRequest.find({Tailor:req.params.tailor,Type:"Direct"}).exec(function(err, order){
        if(err){
            return res.status(404).send(err);
        }
        res.json(order)
    })
}

