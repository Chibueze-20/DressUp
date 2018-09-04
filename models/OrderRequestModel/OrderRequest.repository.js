var OrderRequest = require('./OrderRequest');


exports.getAllOrders = function(req,res,next){
    OrderRequest.find()
    .sort('desc')
    .skip(Number(req.params.skip))
    .limit(20)
    .exec( function(err, users){
        if(err){
         return  res.send(err);
        }
        res.json(users);
    })
}

exports.saveRandom = function(req, res,next){
    let newRequest = new OrderRequest();
    newRequest.save()
    .then(success =>{
        res.status(200).json({Message: "User Successfully Added",type:"Success"})
      }).catch(err =>{
        res.status(400).json({Message:"unable to save to Database "+err,type:"Error"})
    });
}