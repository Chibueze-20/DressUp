var repository = require('../models/search.repository')

var express = require('express')
var router = express.Router();

router.get('/tailor/:query',repository.search)

module.exports = router;