var repository = require('../models/RequestModel/request.repository')
var express = require('express');
var router = express.Router();

router.post('/send',repository.CreateRequest);
router.post('/view',repository.findRequestbyID);
router.get('/request/:user',repository.findRequest);
router.get('/all/:skip',repository.findAllBids);
router.get('/direct', repository.getDirectOrders);
router.get('/',repository.allrequests);
module.exports = router;