const express = require('express');
const router = express.Router();
const keys = require('../keys.js')
const request = require('request');

const clientId = keys.slackApp_clientId
const clientSecret = keys.slackApp_clientSecret

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
	console.log("req.body ", req.body)
	res.send(req.body)
})

router.post('/pin', function(req, res, next){
	console.log('req.body PIN', req.body)
	res.send(req.body.challenge)

})

router.post('/pinned', function(req, res, next){
	console.log('req.body PIN', req.body)
	res.send(req.body)

})
module.exports = router