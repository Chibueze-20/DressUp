var repository = require('../models/BidModel/bid.repository');
var express = require('express');
var router = express.Router();

router.post('/place',repository.PlaceBid);
router.get('/accept/:id',repository.AcceptBid);
router.post('/accept/direct',repository.AcceptDirectBid);
router.get('/reject/:id',repository.RejectBid);
router.get('/bids/:user',repository.showBids);
router.get('/bids/direct/:tailor',repository.showDirectBids);
module.exports = router;