const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'html')));

app.get('/json',function(req,res){
	let sample = [{
  "name": "webserver",
  "version": "1.0.0",
  "description": "first project",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
},{
  "name": "webserver",
  "version": "1.0.0",
  "description": "first project",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.17.1"
  }
}];

	res.json(sample);
});

app.get('/download',function(req,res){
	res.download(path.join(__dirname,'/download/sample.txt'));
});

app.get('/about',function(req,res){
	res.redirect('/about.html');
});

app.post('/subcribe',function(req,res){
	let name = req.body.name;
	let email = req.body.email;

	console.log(name + " has submitted " + email);
});

app.listen(3000,function(){
	console.log("starting");
});