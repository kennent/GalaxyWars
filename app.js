// Setup basic express server
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var path = require('path');
var session = require('express-session');
var keys = require('./config/keys.json');
var server = require('http').createServer(app);
var io = require('./lib/sockets').listen(server);
var port = process.env.PORT || 80;

// server listen
server.listen(port, () => { console.log('Server listening at port %d', port); });

// set
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Routing
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(session({
  secret: keys.session.secret,
  resave: false,
  saveUninitialized: true
}));
app.use('/', require('./router/router.js'));
// app.use('/game', require('./public/game'));