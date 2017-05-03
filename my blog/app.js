var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var session = require('express-session');
var validator = require('express-validator');
var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin@ds119151.mlab.com:19151/bucket-list');
var db = mongoose.connection;

var app = express();
var port = process.env.PORT || 3000;


var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://admin:admin@ds119151.mlab.com:19151/bucket-list';


mongoClient.connect(url, function(err, database){
  console.log("mongodb");
  if(err){console.log(err);};
  db=database;
  Articles = db.collection('articles');
  Categories = db.collection('categories');

  app.listen(port, function(){
    console.log("starting");
  });
});

var index = require('./routes/index');
var articles = require('./routes/articles');
var manage = require('./routes/manage');
var categories = require('./routes/categories');

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

app.locals.moment = require('moment');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(validator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use('/', index);
app.use('/articles', articles);
app.use('/categories', categories);
app.use('/manage', manage);
