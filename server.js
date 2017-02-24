const https = require('https')
const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser')

const options = {
	key: 'mykey',
	cert: 'mycert'
}

const app = express()

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', require('./routes'))

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((req, res, next, error) => {
	res.send(error.message)
})

// sets our server port for development
const PORT = process.env.PORT || 3000

app.listen(PORT, function(){
		console.log("app is listening on port 3000...")
	});
//const server = https.createServer(options, app)