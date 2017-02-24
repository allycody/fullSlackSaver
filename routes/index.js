const express = require('express');
const router = express.Router();
const keys = require('../keys.js')
const request = require('request');

const clientId = keys.slackApp_clientId
const clientSecret = keys.slackApp_clientSecret

const validator = require('email-validator');
const transporter = require('../nodemailer')


router.get('/', function(req, res, next){
	res.send('done')
})


router.get('/oauth', function(req, res, next){
	if (!req.query.code) {
        res.status(500);
        res.send({"Error": "Looks like we're not getting code."});
        console.log("Looks like we're not getting code.");
    } else {
        // If it's there...

        // We'll do a GET call to Slack's `oauth.access` endpoint, passing our app's client ID, client secret, and the code we just got as query parameters.
        request({
            url: 'https://slack.com/api/oauth.access', //URL to hit
            qs: {code: req.query.code, client_id: clientId, client_secret: clientSecret}, //Query string data
            method: 'GET', //Specify the method

        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                res.json(body);

            }
        })
    }

    // // Route the endpoint that our slash command will point to and send back a simple response to indicate that ngrok is working
    // router.post('/pin', function(req, res) {
    //     res.send('Your ngrok tunnel is up and running!');
    // });

})

router.post('/test', function(req, res, next){
	console.log("req.body ", req.body)
	res.send(req.body)
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
	console.log("user: ", req.body.event.user)
	console.log("message: ", req.body.event.item.message)
	let message = req.body.event.item.message
	request({
            url: 'https://slack.com/api/users.info', //URL to hit
            qs: {code: req.query.code, client_id: clientId, client_secret: clientSecret, user:req.body.event.user, token:keys.otherToken}, //Query string data
            method: 'GET', //Specify the method

        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
            	body = JSON.parse(body)
            	console.log("BODY: ", body)
            	let email = body.user.profile.email
				// setup e-mail data with unicode symbols
				var mailOptions = {
						from: '<fullslacksaver@gmail.com>', // sender address
						to: email, // list of receivers
						subject: `Slack message from ${req.body.team_domain} ✔`, // Subject line
						html: `<b>Saved from team ${req.body.team_domain} / ${req.body.channel_name}</b><br />${message}` // html body
				};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
				if(error){
						next(new Error(`Sending Failed: ${error.message}`))
				}
				console.log('Message sent: ' + info.response);
				res.send(`Your message was sent to ${email}`)
		});
                res.json(body);



        }

})
})

router.post('/pinned', function(req, res, next){
	console.log('req.body PIN', req.body)
	res.send(req.body)

})

module.exports = router


