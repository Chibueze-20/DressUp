let express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./config/DB');
  formidable = require('formidable');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DB,{ useNewUrlParser: true}).then(
  () => {console.log("Database connection successful")},
  err => {console.log("can not connect to database")}
);

const userController = require('./controllers/user.controller');
const requestController = require('./controllers/request.controller')
const orderRequestController = require('./controllers/OrderRequest.controller');
const postController = require('./controllers/post.controller');
const feedbackController = require('./controllers/feedback.contoller');
const searchController = require('./controllers/search.controller')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())
var port = process.env.PORT || 4000;

app.use('/user',userController);
app.use('/request',requestController)
app.use('/order',orderRequestController);
app.use('/post',postController);
app.use('/feedback',feedbackController);
app.use('/search',searchController);
app.post('/upload',function(req,res,next){
  var form = formidable.IncomingForm();
  form.parse(req);
  form.on('fileBegin', function (name, file){
    file.path = __dirname + '/src/assets/images/' + file.name;
});

form.on('file', function (name, file){
  console.log(file);
    console.log('Uploaded ' + file.name);
});
  res.send(__dirname+'/src/assets/images');
})
app.get('/*',function(req,res,next){res.send("<h1>Nothing to find here hehe..</h1>")})

app.listen(port);
console.log("server listening on port "+port);

