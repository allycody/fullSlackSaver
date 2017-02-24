const express = require('express');
const router = express.Router();
const validator = require('email-validator');
const transporter = require('../nodemailer')

router.get('/', function(req, res, next){
	res.send('done')
})

router.post('/email', function(req, res, next){
	let messageSeparatorIndex = req.body.text.indexOf(' ');
	if (messageSeparatorIndex === -1) {
		let error = new Error(':-1: Invalid syntax Usage: `/email <email> <message>`')
		next(error)
	}
	let email = req.body.text.slice(0, messageSeparatorIndex);
	let text = req.body.text.slice(messageSeparatorIndex);
	if (validator.validate(email)) {
		// setup e-mail data with unicode symbols
		var mailOptions = {
				from: '<fullslacksaver@gmail.com>', // sender address
				to: email, // list of receivers
				subject: `Slack message from ${req.body.team_domain} ✔`, // Subject line
				html: `<b>Saved from team ${req.body.team_domain} / ${req.body.channel_name}</b><br />${text}` // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
				if(error){
						next(new Error(`Sending Failed: ${error.message}`))
				}
				console.log('Message sent: ' + info.response);
				res.send(`Your :email: was sent to ${email} :100:`)
		});
	} else {
		res.send(':no_entry: invalid email address\nUsage: `/email <email> <message>`')
	}
})

router.post('/pin', function(req, res, next){
	console.log('req.body PIN', req.body)
	res.send(req.body.challenge)

})

module.exports = router