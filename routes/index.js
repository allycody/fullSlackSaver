const express = require('express');
const router = express.Router();
const validator = require('email-validator');
const transporter = require('../nodemailer')

router.get('/', function(req, res, next){
	res.send('done')
})

router.post('/email', function(req, res, next){
	console.log('~~~~~in EMAIL ROUTE~~~~~~')
	console.log(req.body)
	let index = req.body.text.indexOf(' ');
	let email = req.body.text.slice(0, index);
	let text = req.body.text.slice(index);
	if (validator.validate(email)) {
		// setup e-mail data with unicode symbols
		var mailOptions = {
				from: '<fullslacksaver@gmail.com>', // sender address
				to: email, // list of receivers
				subject: `Slack message from ${req.body.team_domain} ✔`, // Subject line
				html: `<b>Saved from team ${req.body.team_domain} / ${req.body.channel_name}</b><br />${text}` // plaintext body
				// html: '<b>Hello world ?</b>' // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
				if(error){
						res.send(`Sending Failed: ${error.message}`)
						return console.log(error);
				}
				console.log('Message sent: ' + info.response);
				res.send('Your message was sent')
		});
	} else {
		res.send('invalid email address\nUsage: `/email <email> <message>`')
	}
})

router.post('/pin', function(req, res, next){
	console.log('req.body PIN', req.body)
	res.send(req.body.challenge)

})

module.exports = router