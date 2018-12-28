

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


app.set('port', 8080);
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


app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});








module.exports = app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
  console.log('Visit http://localhost:' + app.get('port'))
})