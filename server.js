let express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./config/DB');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DB,{ useNewUrlParser: true}).then(
  () => {console.log("Database connection successful")},
  err => {console.log("can not connect to database")}
);

const userController = require('./controllers/user.controller');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())
var port = process.env.PORT || 4000;

app.use('/user',userController);

app.listen(port);
console.log("server listening on port "+port);

