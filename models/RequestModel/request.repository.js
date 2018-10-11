var Request = require('./Request')

exports.CreateRequest = function(req,res,next){
    let request = new Request(req.body.request);
    request.CreatedAt = new Date().toISOString();
    request.Picture = req.body.pic;
    if(req.body.tags){
        request.Tags = req.body.tags;
    }
    request.save( function(err, request){
        if(err){
            return res.staus(400)
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
    .skip(Number(req.params.skip))
    .sort('-CreatedAt')
    .exec(function(err,requests){
        if(err){
            return res.status(404).send(err)
        }
        res.send(requests);
    })
}
// gets all requests directed to a tailor
exports.getDirectOrders = function(req,res){
    Request.find({Tailor:req.params.tailor,Type:"Direct"}).exec(function(err, order){
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