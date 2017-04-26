var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');

var app = express();

var port = process.env.PORT || 3000;

var mongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://admin:admin@ds119151.mlab.com:19151/bucket-list';

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoClient.connect(url, function(err, database){
	console.log("mongodb");
	if(err){console.log(err);};
	db=database;
	Todos = db.collection('todos');

	app.listen(port, function(){
		console.log("starting");
	});
});

app.get('/', function(req,res,next){
	Todos.find({}).toArray(function(err, todos){
		if(err){return console.log("todo error: " + err);}
		res.render('index',{
			todos:todos
		});
	});
});

app.post('/todo/add', function(req,res,next){
	var todo = {
		text: req.body.text,
		body: req.body.body
	}
	Todos.insert(todo, function(err,result){
		if(err){return console.log(err);}
		console.log("todo Added");
		res.redirect('/');
	})
})

app.delete('/todo/delete/:id',function(req,res,next){
	var query = {_id: ObjectID(req.params.id)};
	Todos.deleteOne(query, function(err, response){
		if(err){return console.log(err);}
		res.send(200);
	});
});

app.get('/todo/edit/:id', function(req,res,next){
	var query = {_id: ObjectID(req.params.id)};
	Todos.find(query).next(function(err, todo){
		if(err){return console.log("todo error: " + err);}
		res.render('edit',{
			todo:todo
		});
	});
});

app.post('/todo/edit/:id', function(req,res,next){
	var query = {_id: ObjectID(req.params.id)};
	var todo = {
		text: req.body.text,
		body: req.body.body
	}
	Todos.updateOne(query, {$set:todo}, function(err,result){
		if(err){return console.log(err);}
		console.log("todo Edited");
		res.redirect('/');
	})
})