const webpush = require('web-push');

const vapidKeys ={
    "publicKey":"BDWf4w7jgxrWqiJ3csPw1Tko2_-ERJ4lOl_1f7InTxkMI4Q12CQ8H3xYM0_UvmQMHHNirJy89HQZ4wGBUxmwYdQ",
    "privateKey":"AnJAVKOgZwXqWWv0HzgUCwHOTrtZQMe4aI9kpAiI2zk"
};
webpush.setVapidDetails(
    'mailto:blazinchibs@yahoo.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);
const notificationPayload = {
    "notification":{
        "title":"",
        "body":"",
        "icon":"",
        "vibrate":[100,50,100],
        "data":{
            "dateOfArrival":0,
            "primaryKey":1
        },
        "actions":[{
            "action":"explore",
            "title":"Go to the site"
        }]
    }
}
var Notifications = require('./notification');
var Message = require('./messages');
exports.add = function (req, res) { 
    var newnotify = new Notifications(req.body);
    newnotify.save()
 }

 exports.NotifyAllUsers =function(req,res){
     notificationPayload.notification.title = req.body.title;
     notificationPayload.notification.body = req.body.message;
     notificationPayload.notification.data.dateOfArrival = Date.now();
     var notifications = []
     Notifications.find({UserRole:'User'}).select('Endpoint')
     .exec(function (err,not) { 
         if(not){
             notifications = not;
         }
      })
      Promise.all(notifications.map(sub =>webpush.sendNotification(sub.Endpoint,JSON.stringify(notificationPayload) )))
      .then(() => res.status(200).json({message:"Notification sent"}))
      .catch((err) => res.status(500).json({message:"could not send notification",error:err}))
 }

 exports.sendMessage= function(req,res){
    let message = new Message(req.body);
    message.save(function(err,msg){
        if(err){
            res.status(400).json({Message:"unable to save to Database/n "+err,type:"Error"})
        }else{
            res.status(200).json({Message: "Successfully Posted",type:"Success"})
        }
    })
 }
 exports.getMessages = function(req,res){
     Message.find({To:req.params.id,Type:req.params.kind},function(err,msgs){
         if (err) {
             res.status(404).json({Message:"no messages found",type:"Error"})
         } else {
             res.status(200).send(msgs)
         }
     })
 }