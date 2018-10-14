var Admin = require('./Admin');

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