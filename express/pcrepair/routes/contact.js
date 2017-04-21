var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('contact', { 
  	title: 'Contact' 
  });
});

router.post('/send', function(req,res,next){
	var transporter = nodemailer.createTransport({
		service:'Gmail',
		auth: {
			user: 'limmanuellopez@gmail.com',
			pass: ''
		},
		tls:{
			rejectAuthorized : false
		}
	});

	var mailOptions = {
		from: '"Limmanuel Lopez ?" <limmanuellopez@gmail.com>',
		to: 'lopezlimmanuel@gmail.com',
		subject: 'testing nodemailer',
		text: 'Message from your HTML Name: '+ req.body.name + 'Email: ' + req.body.email + 'Message: ' + req.body.message ,
		html: '<p>Message from your HTML </p><ul><li>Name: '+ req.body.name + '</li><li>Email: ' + req.body.email + '</li><li>Message: ' + req.body.message + '</li></ul>'
	}
	transporter.sendMail(mailOptions,function(error,info){
		if(error){return console.log(error);}
		console.log('message Sent', info.response)
		res.redirect('/');
	});
});

 
module.exports = router;
