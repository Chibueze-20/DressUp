var Post  = require('./Post')

//Send post
exports.createPost = function(req,res,next){
    let post = new Post(req.body.post);
    post.Picture = req.body.pic;
    if(req.body.tags) {
        post.Tags = req.body.tags;
    }
    post.CreatedAt = new Date();
    // console.log(req.body);
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
    .sort('-CreatedAt -_id')
    .skip(Number(req.params.skip)||0)
    .limit(20)
    .select('Picture _id')
    .exec(function(err,posts){
        if(err){
            res.status(400).json(err);
        }else{
            res.json(posts);
        }
    })
}

//the posts of a particular tailor
exports.tailorPosts = function(req,res,next){
    Post.find({Tailor:req.body.tailor})
    .sort('-CreatedAt -_id')
    .skip(Number(req.params.skip)||0)
    .limit(20)
    .select('Picture _id')
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
    .skip(Number(req.params.skip)||0)
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
    Post.findOne({_id: req.params.id})
    .populate({
        path: 'Tailor',
        select: '_id Brand.BrandName Profile',
        populate: { path: 'Profile', select: 'Display'}
    })
    .exec(function(err,post){
        if(err){
            res.status(404).json(err);
        }else{
            res.json(post);
        }
    })
}

exports.CountPosts = function(){
    let postcount = 0
    Post.count().exec(function(err,number){
        if(err || number === null){
            count = 0;
        }else{
            count = number;
        }
        postcount = count;
    })
    return postcount;
}
exports.CountPostsbyUser = function(id){
    let postcount = 0
    Post.count({Tailor: id}).exec(function(err,number){
        if(err || number === null){
            count = 0;
        }else{
            count = number;
        }
        postcount = count;
    })
    return postcount;
}