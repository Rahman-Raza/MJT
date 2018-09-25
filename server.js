const helmet = require('helmet')

const express = require('express')
const app = express()
const layout = require('express-layout')
const bodyParser = require('body-parser')
const validator = require('express-validator')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash')

app.set('port', 8080)

// Call the multerImpl and pass in app state to it
const middleware = [
 helmet(),
layout(),
express.static('./'),

bodyParser.urlencoded(),
bodyParser.json(),
 validator(),
  cookieParser(),
  session({
    secret: 'super-secret-key',
    key: 'super-secret-cookie',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }),
  flash(),

]

app.use(middleware);
require('./dist/InstyBetaServer')(app);
require('./dist/file-upload-server')(app);

module.exports = app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
  console.log('Visit http://localhost:' + app.get('port') + '/example/ to check out the upload example')
})
