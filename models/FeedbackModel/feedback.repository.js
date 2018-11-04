var Feedback =  require('./Feedback');
var User = require('../UserModel/User');
var mongoose = require('mongoose');
// gives the total average of ratings for a tailor and how many people rated
exports.AverageRatings = function(req,res,next){
    //id = req.params.id;
    Feedback.aggregate([
    {
        $match: {
            Tailor: mongoose.Types.ObjectId(req.params.Tailor)
        }
    },
    {
        $group:{
            _id: '$Tailor',
            AvgRating: {
                $avg: '$Rating'
            },
            Ratedby: {
                $sum: 1
            }
        }
    }
    ]
    )
    .exec(function(err,Ratings){
        if(err){
            res.status(400).json({Message: "Error retriving ratings",type: "Error", err: err})
        }else{
            res.send(Ratings);
        }
    })
}

exports.CreateFeedback = function(req,res,next){
    let feed = new Feedback(req.body);
    feed.CreatedAt = new Date();
    feed.UpdatedAt = new Date();
    feed.save(function(err,feedback){
        if(err){
            res.status(400).json({Message: "Error saving to database",type:"Error"})
        }else{
            User.feedback(feedback.Tailor,function(err,user){
                if(user.Ratings.Stars){
                    user.Ratings.Stars = user.Ratings.Stars + feedback.Rating
                  }else{
                    user.Ratings.Stars = feedback.Rating
                  }
                  if(user.Ratings.Ratedby){
                    user.Ratings.Ratedby = user.Ratings.Ratedby +1
                  }else{
                    user.Ratings.Ratedby = 1
                  }
                  user.Ratings.AvgRating = user.Ratings.Stars/user.Ratings.Ratedby
                user.save(function(err,user){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(user.Ratings)
                    }
                });
            })
            res.json({Message:"Succecfully created",type:"Success"})
        }
    })
}
exports.getFeedbacks = function(req,res,next){
    Feedback.find({Tailor: req.params.Tailor})
    .skip(Number(req.body.skip) || 0)
    .limit(4)
    .exec(function(err,feedbacks){
        if(err){
            res.status(404).json({Message: "Error getting records",type: "Error"})
        }else{
            res.send(feedbacks)
        }
    })
}
exports.getFeedbacksById = function(req,res,next){
    let array = req.body.Feedbacks.map(feed =>  mongoose.Types.ObjectId(feed));
    Feedback.find()
    .where('_id').in(array)
    .exec(function(err,feedbacks){
        if (err) {
           return res.status(404).send(err);    
        } else {
            if (feedbacks) {
                return res.status(200).send(feedbacks);
            } else {
                return res.status(404).json({Message: "Error getting records",type: "Error"});
            }
        }
    })
}