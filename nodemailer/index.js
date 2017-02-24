var nodemailer = require('nodemailer');
var key = require('../keys')
const {resolve} = require('path')

const env = Object.create(process.env)
const secretsFile = resolve(__dirname, `../keys`)
console.log('secrets', secretsFile)
try {
  Object.assign(env, require(secretsFile))
} catch (error) {
  console.log('env file not found or invalid, moving on')
}

var transporter = nodemailer.createTransport(`smtps://${env.gmailUser}:${env.gmailPw}@smtp.gmail.com`)

transporter.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take our messages');
   }
});

module.exports = transporter;