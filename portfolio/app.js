var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


var app = express();
var port = process.env.PORT || 3000;
var contact = require('./html/contact')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/contact', contact);
app.get('/', function(req,res){
	res.redirect('/index.html')
});

app.use(express.static(path.join(__dirname,'html')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/index.html'));
});
app.use('/download', function(req, res) {
	res.download(path.join(__dirname + '/download/Limmanuel-B.-Lopez-Resume.docx'))
});

app.listen(port,function(){
	console.log("starting");
});

module.exports = app;