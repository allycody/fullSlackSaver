var nodemailer = require('nodemailer');
var key = require('../keys')
var transporter = nodemailer.createTransport(`smtps://${key.gmailUser}:${key.gmailPw}@smtp.gmail.com`)

transporter.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take our messages');
   }
});

module.exports = transporter;