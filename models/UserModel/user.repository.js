var User = require('./User');
//Create
exports.createUser = function (req,res,next) {
  let newUser = new User(req.body);
  newUser.save()
    .then(success =>{
      res.status(200).json({Message: "User Successfully Added",type:"Success"})
    }).catch(err =>{
      res.status(400).json({Message:"unable to save to Database "+err,type:"Error"})
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
exports.getUserById = function (req,res,next) {
  let id = req.params.id;
  User.findById(id,function (err, user) {
    if (err){
      console.log(err)
    }else{
      res.json(user)
    }
  });
}
//Read -by email and password
exports.getUser = function(req,res,next){
  let user = {email:req.body.email, password: req.body.password};
  User.findOne({'Account.Email':user.email, 'Account.Password':user.password,Role:'User'}, function (err, duser) {
    if(err){
      res.status(400).json({Message:"Invalid user details",type:"Error"});
    }else{
      if(duser){
        res.json(duser);
      }else{
        res.status(404).json({Message: "User Not Found",type:"Error"});
      }
    }
  });
}
//Read -by email and password and brand
exports.getDesigner = function(req,res,next){
  let user = {email:req.body.email, password: req.body.password,brand:req.body.brand};
  User.findOne({'Account.Email':user.email, 'Account.Password':user.password,'Brand.BrandName':user.brand,'Role':'Designer'}, function (err, duser) {
    if(err){
      res.status(400).json({Message:"Invalid user details",type:"Error"});
    }else{
      if(duser){
        res.json(duser);
      }else{
        res.status(404).json({Message: "User Not Found",type:"Error"});
      }
    }
  });
}

//Update -by id
exports.updateUserAccountById = function (req, res, next) {
  User.findById(req.params.id,function (err,user) {
    if(!user){
      return next(new Error("could not load document"))
    } else {
      user.Account.Email = req.body.email;
      user.Account.Password = req.body.password;

      user.save().then(user => {
        res.json({Message:"update successful",type:"Success"});
      }).catch(err => {
        res.status(400).json({Message:"update unsuccessful",type:"Error"});
      });
    }
  });
}

exports.updateUserContactById = function (req, res, next) {
  User.findById(req.params.id,function (err,user) {
    if(!user){
      return next(new Error("could not load document"))
    } else {
      user.Contact.City = req.body.city;
      user.Contact.State = req.body.state;
      user.Contact.PhoneNumber = req.body.phone;
      user.Contact.HomeAddress = req.body.home;
      user.Contact.PostAddress = req.body.post;

      user.save().then(user => {
        res.json({Message:"update successful",type:"success"});
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
      user.Name.FirstName = req.body.firstname;
      user.Name.MiddleName = req.body.middlename;
      user.Name.LastName = req.body.lastname;

      user.save().then(user => {
        res.json({Message:"update successful",type:"success"});
      }).catch(err => {
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
      user.Brand.BrandDescription = req.body.description;
      user.Brand.WorkAddress = req.body.address;
      user.Brand.BrandName = req.body.address;

      user.save().then(user => {
        res.json({Message:"update successful",type:"success"});
      }).catch(err => {
        res.status(400).json({Message:"update unsuccessful",type:"Error"});
      });
    }
  });
}

//Delete -by id
exports.DeleteUserById = function (req,res,next) {
  User.findByIdAndRemove({_id: req.params.id}, function (err,user) {
    if(err){ res.json(err);}else{ res.json({Message:"delete successful",type:"success"});}
  } )
}
