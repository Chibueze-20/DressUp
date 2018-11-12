var repository = require('../models/PostModel/post.repository')

var express = require('express');
var router = express.Router();

// new post
router.post('/new',repository.CreatePost);

//all posts add param for skip
router.get('/all',repository.AllPosts);

//followed posts
router.post('/following',repository.FollowedPosts)

module.exports = router;