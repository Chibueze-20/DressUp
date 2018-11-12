var repository = require('../models/FeedbackModel/feedback.repository')

var express = require('express');
var router = express.Router();

router.post('/send',repository.CreateFeedback);
router.post('/recent',repository.getFeedbacks);
router.get('/rating/:Tailor',repository.AverageRatings);

module.exports = router