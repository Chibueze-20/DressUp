var repository = require('../models/notificationModel/notification.repository')
var express = require('express');
var router = express.Router();

router.post('/send',repository.sendMessage);
router.get('/messages/:id/type/:kind',repository.getMessages);

module.exports = router