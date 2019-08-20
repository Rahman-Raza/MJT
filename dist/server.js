

const helmet = require('helmet');
var path = require('path');
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const layout = require('express-layout');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const flash = require('express-flash');
var connect = require('connect');
var serveStatic = require('serve-static');
const sendmail = require('sendmail')();
var nodeoutlook = require('nodejs-nodemailer-outlook');


app.set('port', 8086);
// Add headers
app.enable('trust proxy');



const middleware = [
 helmet(),
layout(),
express.static('./', {index:false,extensions:['html']}),
session({
  name: 'session',
  keys: ['key1', 'key2'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}),
bodyParser.urlencoded(),
bodyParser.json(),
 validator(),
  cookieParser(),

  flash(),

]

app.use(middleware);
require('./file-upload-server')(app);
require('./InstyBetaServer')(app);

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.post('/contact_form', function (req, res) {
	console.log("got to /contact_form");
nodeoutlook.sendEmail({
    auth: {
        user: "info@myjobtank.com",
        pass: "Wailian888!"
    }, from: 'info@myjobtank.com',
    to: 'info@myjobtank.com',
    subject: 'MyJobTank.com Contact Form Submission',
    html:  '<h1> Contact Form Details: </h1>'+ '<br>'+
    		'<h2>Name: </h2>'+	req.body.firstname + ' ' +req.body.lastname + '<br>'+

    		'<h2>Email Address: </h2>'+	req.body.email + '<br>'+

    		'<h2>Phone Number: </h2>'+	req.body.phone + '<br>'+

    		'<h2>Company: </h2>'+	req.body.company + '<br>'+

    		'<h2>Position: </h2>'+	req.body.subject + '<br>'+
    		


    		'<h2>Message: </h2>'+ req.body.message,
    text: 'This is text version!'
    });
console.log("after nodeoutlook code");
 res.send("contact-form success");




  // let mailOpts, smtpTrans;
  // smtpTrans = nodemailer.createTransport({
  //   // host: 'smtp.office365.com',
  //   // port: 587,
  //  	// secureConnection: false,
  //   // tls: { ciphers: 'SSLv3' },
  //   service: 'Gmail',
  //   auth: {
  //     user: 'raziboy939@gmail.com',
  //     pass: 'RobeenaA321'
  //   }
  // });
  // mailOpts = {
  //   from: req.body.name + ' &lt;' + req.body.email + '&gt;',
  //   to: 'raziboy939@gmail.com',
  //   subject: 'New message from contact form at MJT',
  //   text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  // };
  // smtpTrans.sendMail(mailOpts, function (error, response) {
  //   if (error) {
  //   	console.log("there was an error sending out the contact form email", error);
  //    res.send("contact-form failure");
  //   }
  //   else {
  //   	console.log("message was sent sucessfully!", response);
  //     res.send("contact-form success");
  //   }
  // });

//   let transporter = nodemailer.createTransport({
//     sendmail: true,
//     newline: 'unix',
//     path: '/usr/sbin/sendmail'
// });
// transporter.sendMail({
//     from: 'info@myjobtank.com',
//     to: 'raziboy939@gmail.com',
//     subject: 'MJT Transport Message',
//     text: 'I hope this message gets delivered!'
// }, (err, info) => {
//     console.log(info.envelope);
//     console.log(info.messageId);
// });



	//   sendmail({
	//     from: 'raziboy939@gmail.com',
	//     to: 'raziboy939@gmail.com ',
	//     subject: 'myjobtank test',
	//     html: 'Mail of test sendmail ',
	//   }, function(err, reply) {
	//     console.log(err && err.stack);
	//     console.dir(reply);
	// });
});






module.exports = app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
  console.log('Visit http://localhost:' + app.get('port'))
})