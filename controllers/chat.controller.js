var repository = require('../models/ChatModel/chat.repository');
var express = require('express');
var router = express.Router();

router.get('/all/:id',repository.getChat);
router.get('/order/chat/:id',repository.getChatByOrder);
router.post('/all/update/:id',repository.UpdateChat);