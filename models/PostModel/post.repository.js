var Post  = require('./Post')

//Send post
exports.createPost = function(req,res,next){
    let post = new Post(req.body);
    post.save(function(err,newPost){
        if(err){
            res.status(400).json({Message:"unable to save to Database/n "+err,type:"Error"})
        }else{
            res.status(200).json({Message: "Successfully Posted",type:"Success"})
        }
    })
}

//View all posts {no restriction} TODO: add skip
exports.allPosts = function(req,res,next){
    Post.find()
    .sort('-CreatedAt')
    .skip(Number(req.params.skip))
    .limit(20)
    .exec(function(err,posts){
        if(err){
            res.status(400).json(err);
        }else{
            res.json(posts);
        }
    })
}

// View all posts {restricted}
exports.followedPosts = function(req,res,next){
    Post.find()
    .where('Tailor').in(req.body.Tailor)
    .sort('-CreatedAt')
    .skip(Number(req.params.skip))
    .limit(20)
    .exec(function(err,posts){
        if(err){
            res.status(400).json(err);
        }else{
            res.json(posts);
        }
    })
}

// get one post by its ID
exports.getPost = function(req, res, next){
    Post.findOne({_id: req.params.id}).exec(function(err,post){
        if(err){
            res.status(404).json(err);
        }else{
            res.json(post);
        }
    })
}