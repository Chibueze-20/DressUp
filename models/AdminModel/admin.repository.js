var Admin = require('./Admin');
var userrepo = require('../UserModel/user.repository');
var orderrepo = require('../OrderRequestModel/OrderRequest.repository');
var postrepo = require('../PostModel/post.repository');
var bidrepo = require('../RequestModel/request.repository');
var User = require('../UserModel/User');
var Order = require('../OrderRequestModel/OrderRequest');
var Post = require('../PostModel/Post');
var Bid = require('../RequestModel/Request');

exports.LogIn = function(req,res,next){
    Admin.findOne({'Account.Email': req.body.Email, 'Account.Password': req.body.Password})
    .exec(function(err,admin){
        if(err){
            return res.status(404);
        }
        if(admin){
            return res.json(admin)
        }else{
            return res.status(404)
        }
    })
}
exports.CreateAdmin = function(req,res,next){
    let admin = new Admin(req.body);
    admin.save(function(err,admin){
        if(err){
           return res.status(400)
        }
        return res.json({Message: "Admin added succesfully"})
    })
}
exports.details = function(req,res,next){
    let user = userrepo.CountUsers();
    let order = orderrepo.CountOrders();
    let bids = bidrepo.countBids();
    let post = postrepo.CountPosts();
}
exports.getAllTailors = function(req,res,next){
    User.find({Role:'Designer'},function(err,users){
        if(err){
            return res.status(404);
        }
        return res.send(users);
    })
}
exports.getAllUsers = function(req,res,next){
    User.find({Role:'User'}, function(err,users){
        if(err){
            return res.status(404);
        }
        return res.send(users);
    })
}
exports.getAllOrders = function(req,res,next){
    Order.find().exec(function(err,orders){
        if(err){
            return res.status(404);
        }
        return res.send(orders);
    })
}
exports.getCompletedOrders = function(res,res,next){
    Order.find({Completed:true}).exec(function(err,orders){
        if(err){
            return res.status(404);
        }
        return res.send(orders);
    })
}
exports.getOngoingOrders = function(res,res,next){
    Order.find({Completed:false}).exec(function(err,orders){
        if(err){
            return res.status(404);
        }
        return res.send(orders);
    })
}
exports.getAllPosts = function(req,res,next){
    Post.find(function(err,posts){
        if(err){
            return res.status(404);
        }
        return res.send(posts);
    })
}
exports.getAllBids = function(req,res,next){
    Bid.find(function(err,bids){
        if(err){
            res.status(404);
        }
        res.send(bids);
    })
}
exports.detailsbyId = function(req,res,next){
    if(req.body.role === 'User'){
       order = orderrepo.CountOrdersbyUser(req.body.id,req.body.role);
       bid = bidrepo.countBidsbyUser(req.body.id);
       return res.send({OrderDetails: order,BidDetails:bid})
    } else if (req.body.role === 'Designer'){
        order = orderrepo.CountOrdersbyUser(req.body.id,req.body.role);
        post = postrepo.CountPostsbyUser(req.body.id);
        return res.send({OrderDetails: order,PostDetails:post})
    }
}