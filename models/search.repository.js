var User = require('./UserModel/User');
var feedback = require('./FeedbackModel/Feedback');

exports.search = function (req,res,next) { 
   User.find({Role:"Designer",'Brand.BrandName':new RegExp(req.params.query,'i')}).sort({'Ratings.AvgRating':-1})
   .select(" _id Profile Brand.BrandName Ratings ").populate('Profile')
   .exec(function(err,user){
       if(err){
        res.send(err);
       }else{
           res.send(user);
       }
   })
 }
