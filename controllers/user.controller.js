var repository = require('../models/UserModel/user.repository');

var express = require('express');
var router = express.Router();

//new user -post
router.post('/new',repository.createUser);
//get/edit user -get
router.get('/view/:id',repository.getUserById);
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
router.post('update/contact/:id',repository.updateUserContactById);
router.post('update/names/:id',repository.updateUserNamesById);
router.post('update/brand/:id',repository.updateUserBrandById);

module.exports = router;
