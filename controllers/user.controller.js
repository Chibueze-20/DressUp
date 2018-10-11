var repository = require('../models/UserModel/user.repository');
var profileRepo = require('../models/ProfileModel/profile.repository');
var express = require('express');
var router = express.Router();

//new user -post
router.post('/user/new',repository.createUser);
//new designer - post
router.post('/designer/new',repository.createDesigner);
//get/edit tailor -get
router.get('/tailor/:id',repository.getTailorById);
//get user by login
router.post('/user/login',repository.getUser);
//get designer by login
router.post('/designer/login',repository.getDesigner);
//get all users
router.get('/',repository.getAllUsers);
router.get('/hey',function (req,res,next) {
  return res.json({message:"hey there"});
})
//delete user -delete
router.get('/delete/:id',repository.DeleteUserById);
//update user -put
router.post('/update/account/:id',repository.updateUserAccountById);
router.post('/update/contact/:id',repository.updateUserContactById);
router.post('/update/names/:id',repository.updateUserNamesById);
router.post('/update/brand/:id',repository.updateUserBrandById);

//custom Sizes
router.post('/sizes/add/:id',repository.AddCustomSize);
router.post('/sizes/update/:id',repository.UpdateCustomSize);

//profile for designers
router.post('/profile/update/:id', profileRepo.UpdateProfile);

module.exports = router;
