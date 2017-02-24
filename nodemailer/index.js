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



// setup e-mail data with unicode symbols
var mailOptions = {
    from: '<fullslacksaver@gmail.com>', // sender address
    to: '<travelplanning7599@gmail.com>', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'OMG THIS IS OUR TEST EMAIL PLEASE PLEASE WORK' // plaintext body
    // html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
