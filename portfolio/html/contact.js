var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

router.get('/', function(req, res, next) {
  res.render('contact', { 
  	title: 'Contact' 
  });
});
router.post('/send', function(req,res){
	console.log("sending");
	var transporter = nodemailer.createTransport({
		service:'Gmail',
		auth: {
			user: 'rndmlpz@gmail.com',
			pass: 'random123'
		}
	});

	var mailOptions = {
		from: '"Limmanuel Lopez ?" <rndmlpz@gmail.com>',
		to: 'limmanuellopez@gmail.com',
		subject: 'message from my website',
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
