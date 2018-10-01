var Profile = require('./Profile')

exports.UpdateProfile = function(req,res,next){
    Profile.findByIdAndUpdate(req.params.id,req.body, {new:true}, function(err,profile){
        if(err){
           return res.status(400).send(err)
        }
        return res.send(profile)
    })
}