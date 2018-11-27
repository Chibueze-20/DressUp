// requirements
let express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./config/DB');
  formidable = require('formidable');

// controllers
const userController = require('./controllers/user.controller');
const requestController = require('./controllers/request.controller')
const orderRequestController = require('./controllers/OrderRequest.controller');
const postController = require('./controllers/post.controller');
const feedbackController = require('./controllers/feedback.contoller');
const searchController = require('./controllers/search.controller');
const adminController = require('./controllers/admin.controller');
const notificationController = require('./controllers/notification.controller');
const bidController = require('./controllers/bid.controller');
const chatController = require('./controllers/chat.controller');

// initialization of servers  
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())
var port = process.env.PORT || 4000;
var server = require('http').createServer(app);
server.listen(4100,'localhost',function(){
  console.log('socket server will be on *:' + 4100);
})
var io = require('socket.io')(server)

// Database
mongoose.Promise = global.Promise;
mongoose.connect(config.DB,{ useNewUrlParser: true}).then(
  () => {console.log("Database connection successful")},
  err => {console.log("can not connect to database")}
);

// socket IO
io.on('connection', function(socket){
  console.log('connection!');
  socket.on('new-message', (message) => {
    console.log('message from angular:',JSON.stringify(message));
    socket.broadcast.emit('new-message-'+message.To,message)
  });
});


// Path definitions
app.use('/admin',adminController);
app.use('/notification',notificationController);
app.use('/user',userController);
app.use('/request',requestController);
app.use('/order',orderRequestController);
app.use('/post',postController);
app.use('/feedback',feedbackController);
app.use('/search',searchController);
app.use('/bid',bidController);
app.use('/chat',chatController);
app.post('/upload',function(req,res,next){
  var form = formidable.IncomingForm();
  form.parse(req);
  form.on('fileBegin', function (name, file){
    file.path = __dirname + '/src/assets/images/' + file.name;
});

form.on('file', function (name, file){
  console.log(file);
  res.send('assets/images/'+file.name);
    console.log('Uploaded ' + file.name);
});
  
})
app.get('/*',function(req,res,next){res.send(404,"<h1>Nothing to find here hehe..</h1>")})

// app listen
app.listen(port);
console.log("server listening on port "+port);

