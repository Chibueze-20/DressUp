var repository = require('../models/PostModel/post.repository')

var express = require('express');
var router = express.Router();

// new post
router.post('/new',repository.createPost);

//all posts add param for skip
router.get('/all/:skip',repository.allPosts);

//followed posts tailor id's sent as array
router.post('/following/:skip',repository.followedPosts);

// post
router.get('/view/:id',repository.getPost);

//tailor posts
router.post('/posts/:skip',repository.tailorPosts);
module.exports = router;