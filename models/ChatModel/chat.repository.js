var Chat = require('./chat');

exports.addMessage = function(id,message){
    Chat.findById(id, function(err,chat){
        if(err){
            console.log(err)
        }
        if(chat){
            console.log('saving');
            chat.Messages.push(message);
            chat.save();
        }
    })
}

exports.getChat = function(req,res){
    Chat.findById(req.params.id)
    .populate({
        path:'Order',
        populate:{
            path:'Order',
            populate:{
                path:'Tailor',
                select:'Brand.BrandName'
            }
        }
    })
    .populate('Request')
    
    .exec(function(err,chat){
        if (err) {
            return res.status(404)
        }
        res.send(chat);
    })
}

exports.getChatByOrder = function(req,res){
    Chat.findOne({Order: req.params.id})
    .populate({
        path:'Order',
        populate:{
            path:'Order',
            populate:{
                path:'Tailor',
                select:'Brand.BrandName'
            }
        }
    })
    .populate('Request')
    .exec(function(err,chat){
        if (err) {
            return res.status(404)
        }
        res.send(chat);
    })
}

exports.UpdateChat = function(req,res){
    Chat.findByIdAndUpdate(req.params.id,req.body,{new:true},function(err,chat){
        if (err) {
            return res.status(404).json({message:'something went wrong'})
        }
        res.send({Message:'Updated',type:'Success'});
    })
}