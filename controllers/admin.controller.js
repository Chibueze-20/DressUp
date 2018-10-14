var repository = require('../models/AdminModel/admin.repository');
var express = require('express');
var router = express.Router();

router.post('/login',repository.LogIn);
router.post('/signup',repository.CreateAdmin);
module.exports = router;
