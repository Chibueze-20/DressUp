var Chat = require('./chat');

exports.addMessage = function(id,message){
    Chat.findById(id, function(err,chat){
        if(err){
            console.log(err)
        }
        if(chat){
            chat.Messages.push(message);
            chat.save();
        }
    })
}

exports.getChat = function(req,res){
    Chat.findById(req.params.id)
    .populate('Order')
    .exec(function(err,chat){
        if (err) {
            return res.status(404)
        }
        res.send(chat);
    })
}

exports.getChatByOrder = function(req,res){
    Chat.findOne({Order: req.body.id})
    .populate('Order')
    .exec(function(err,chat){
        if (err) {
            return res.status(404)
        }
        res.send(chat);
    })
}

exports.UpdateChat = function(req,res){
    Chat.findByIdAndUpdate(req.body.id,req.body.update,{new:true},function(err,chat){
        if (err) {
            return res.status(504).json({message:'something went wrong'})
        }
        res.send(chat);
    })
}