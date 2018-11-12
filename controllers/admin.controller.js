var repository = require('../models/AdminModel/admin.repository');
var express = require('express');
var router = express.Router();

router.post('/login',repository.LogIn);
router.post('/signup',repository.CreateAdmin);
router.get('/',repository.details);
router.get('/tailors/verify/:id',repository.verifyTailor);
router.get('/users',repository.getAllUsers);
router.get('/tailors',repository.getAllTailors);
router.get('/orders',repository.getAllOrders);
router.get('/bids',repository.getAllBids);
router.get('/posts',repository.getAllPosts);
module.exports = router;
