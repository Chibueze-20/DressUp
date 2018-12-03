var repository = require('../models/OrderRequestModel/OrderRequest.repository')
var express = require('express');
var router = express.Router();

// router.get('/save',repository.saveRandom);
// router.post('/send',repository.createRequest);
// router.get('/all/:skip',repository.getAllOrders);
router.post('/update/:id',repository.updateOrder);
router.get('/:id',repository.getOrder);
router.get('/',repository.allrequests);
router.get('/active/all',repository.getOrderByUser);
router.post('/size/:id',repository.updateSize);
router.get('/',function(req,res,next){
    res.send("<h1>Order Request API</h1>");
})

module.exports = router;