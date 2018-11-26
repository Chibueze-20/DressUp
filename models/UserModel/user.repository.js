var User = require('./User');
var Profile = require('../ProfileModel/Profile');
var mongoose = require('mongoose');
//Create
exports.createDesigner = function (req,res,next) {
  let profile = new Profile();
    profile.save(function(err,Profile){
      if(err){
        console.log(err);
      }
      let newUser = new User(req.body);
      newUser.Profile = profile._id;
      newUser.Verified = false;
      newUser.Ratings = {Stars:0,Ratedby:0,AvgRating:0}
      newUser.save(function(err,newuser){
        if(err){
            res.status(400).json({Message:"unable to save to Database/n "+err,type:"Error"})
        }else{
            res.status(200).json({Message: "User Successfully added",type:"Success", User: newUser})
        }
    });
  });
}
//Create
exports.createUser = function(req,res,next){
  let newUser = new User(req.body);
  newUser.save(function(err,user){
      if(err){
        res.status(400).json({Message:"unable to save to Database/n "+err,type:"Error"})
      }else{
        res.status(200).json({Message: "User Successfully added",type:"Success", User: newUser})
      }
  });
}
//Read -all
exports.getAllUsers = function (req,res,next) {
  User.find(function (err, users) {
      if(err){
        console.log(err);
      }else{
        res.json(users)
      }
  });
}
//Read -by id
exports.getTailorById = function (req,res,next) {

  let id = req.params.id;
  User.findById(id)
  .populate('Profile')
  .populate('Feedbacks')
  .exec(function (err, tailor){
    if(err){
    return  res.status(404).send(err)
    }
    return res.json(tailor);
  })
}
//Read -by email and password
exports.getUser = function(req,res,next){
  let user = {email:req.body.email, password: req.body.password};
  User.findOne({'Account.Email':user.email, 'Account.Password':user.password,Role:'User'}, function (err, duser) {
    if(err){
      res.status(400).send({Message:"Invalid user details",type:"Error"});
    }else{
      if(duser){
        res.json({User:duser, Message:"LOG IN", type: "success"});
      }else{
        res.status(404).send({Message: "User Not Found",type:"Error"});
      }
    }
  });
}
//Read -by email and password and brand
exports.getDesigner = function(req,res,next){
  let user = {email:req.body.email, password: req.body.password,brand:req.body.brand};
  User.findOne({'Account.Email':user.email, 'Account.Password':user.password,'Brand.BrandName':user.brand,'Role':'Designer'})
  .populate('Profile')
  .exec(
   function (err, duser) {
    if(err){
      res.status(400).send({Message:"Invalid user details",type:"Error"});
    }else{
      if(duser){
        res.json({User:duser, Message:"LOG IN", type: "success"});
      }else{
        res.status(404).send({Message: "User Not Found",type:"Error"});
      }
    }
  });
}

exports.follow = function(req,res,next){
  User.findById(mongoose.Types.ObjectId(req.body.user),function(err,user){
    if (err) {
      return res.status(404).send({Message: "User Not Found",type:"Error"});
    } else {
      if(user){
        user.Following = req.body.followers
        user.save(function(err,user){
          if (err) {
            return res.status(500).send({Message: "Internal error, something did not go well",type:"Error"});
          } else {
            return res.status(200).send({User:user,Message:"(Un)Followed tailor",type:"Success"});
          }
        })
      }else{
        return res.status(404).send({Message: "User Not Found",type:"Error"});
      }
    }
  })
}

//Update -by id
exports.updateUserAccountById = function (req, res, next) {
  var query;
  if(req.body.CurrentPassword){
    query = {'Account.Email':req.body.CurrentEmail, 'Account.Password':req.body.CurrentPassword}
  }else{
    query = {'Account.Email':req.body.CurrentEmail}
  }
  // console.log(query);
  var obj;
  if (req.body.Password && (req.body.Email == null)) {
   obj = {'Account.Password':req.body.Password}
  }else if(req.body.Email && (req.body.Password == null)){
    obj ={'Account.Email':req.body.Email}
  }else if(req.body.Password && req.body.Email){
   obj = {'Account.Email':req.body.Email,'Account.Password':req.body.Password}
  }else{
    return res.json({Message: "Nothing to update", type: "Sucess"})
  }
  // console.log(obj);
  User.findOneAndUpdate(query,obj,{new:true}, function (err,user){
    if(err){
      return res.json({Message: "Unexpected error updating, invalid details", type: "Error"})
    }
    console.log(user); 
    return res.json(user);
   })
}

exports.updateUserContactById = function (req, res, next) {
  User.findById(req.params.id,function (err,user) {
    if(!user){
      return next(new Error("could not load document"))
    } else {
      if(req.body){
        if(req.body.City){
          user.Contact.City = req.body.City;
          }
          if(req.body.State){
          user.Contact.State = req.body.State;
          }
          if(req.body.PhoneNumber){
          user.Contact.PhoneNumber = req.body.PhoneNumber;
          }
          if(req.body.HomeAddress){
          user.Contact.HomeAddress = req.body.HomeAddress;
          }
          if(req.body.PostAddress){
          user.Contact.PostAddress = req.body.PostAddress;
          }
      }else{
        return res.json({Message: "No Changes", type: "Success"});
      }
      user.save().then(user => {
        console.log(user);
        res.json(user);
      }).catch(err => {
        res.status(400).json({Message:"update unsuccessful",type:"Error"});
      });
    }
  });
}

exports.updateUserNamesById = function (req, res, next) {
  User.findById(req.params.id,function (err,user) {
    if(!user){
      return next(new Error("could not load document"))
    } else {
        if(req.body){
          if(req.body.FirstName){
          user.Name.FirstName = req.body.FirstName;
          }
          if(req.body.MiddleName){
          user.Name.MiddleName = req.body.MiddleName;
          }
          if(req.body.LastName){
          user.Name.LastName = req.body.LastName;
          }
        }else{
          return res.json({Message: "No Changes", type: "Success"});
        }

      user.save().then(user => {
        console.log(user);
        res.json(user);
      }).catch(err => {
        console.log(err);
        res.status(400).json({Message:"update unsuccessful",type:"Error"});
      });
    }
  });
}

exports.updateUserBrandById = function (req, res, next) {
  User.findById(req.params.id,function (err,user) {
    if(!user){
      return next(new Error("could not load document"))
    } else {
      if(req.body){
        if(req.body.BrandDescription){
        user.Brand.BrandDescription = req.body.BrandDescription;
        }
        if(req.body.WorkAddress){
        user.Brand.WorkAddress = req.body.WorkAddress;
        }
      }else{
        return res.json({Message: "No Changes", type: "Success"});
      }

      user.save().then(user => {
        console.log(user);
        res.json(user);
      }).catch(err => {
        res.status(400).json({Message:"update unsuccessful",type:"Error"});
      });
    }
  });
}

//USERs Custom sizes
// exports.AddCustomSize = function(req,res,next){
//   User.findById(req.params.id,function (err,user) {
//     if(!user){
//       return next(new Error("could not load document"))
//     } else {
//       if(req.body){
//         user.CustomSizes.push(req.body);
//       }else{
//         return res.json({Message: "No Changes", type: "Success"});
//       }

//       user.save().then(user => {
//         console.log(user);
//         res.json(user);
//       }).catch(err => {
//         res.status(400).json({Message:"update unsuccessful",type:"Error"});
//       });
//     }
//   });
// }
// exports.UpdateCustomSize = function(req,res,next){
//   User.findById(req.params.id,function (err,user) {
//     if(!user){
//       return next(new Error("could not load document"))
//     } else {
//       if(req.body){
//         user.CustomSizes = req.body;
//       }else{
//         return res.json({Message: "No Changes", type: "Success"});
//       }

//       user.save().then(user => {
//         console.log(user);
//         res.json(user);
//       }).catch(err => {
//         res.status(400).json({Message:"update unsuccessful",type:"Error"});
//       });
//     }
//   });
// }
//Delete -by id
exports.DeleteUserById = function (req,res,next) {
  User.findByIdAndRemove({_id: req.params.id}, function (err,user) {
    if(err){ res.json(err);}else{ res.json({Message:"delete successful",type:"success"});}
  } )
}

exports.CountUsers = function(){
  let totalCount = 0;
  let tailorCount = 0;
  let userCount = 0;
  User.count().exec(function(err,number){
    if(err || number === null){
     Count=0;
    }else{
    Count = number;
    }
    totalCount = Count;
  });
  User.count({Role:'Designer'}).exec(function(err,number){
    if(err || number === null){
     Count=0;
    }else{
    Count = number;
    }
    tailorCount = Count;
  });
  User.count({Role:'User'}).exec(function(err,number){
    if(err || number === null){
     Count=0;
    }else{
    Count = number;
    }
    userCount = Count;
  });
  let countObject = {
    total: totalCount,
    tailor: tailorCount,
    user: userCount
  };
  return countObject;
}
