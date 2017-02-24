const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next){
	res.send('done')
})

router.post('/email', function(req, res, next){
	console.log("req.body ", req.body)
	res.send(req.body)
})

router.post('/pin', function(req, res, next){
	console.log('req.body PIN', req.body)
	res.send(req.body.challenge)

})

module.exports = router