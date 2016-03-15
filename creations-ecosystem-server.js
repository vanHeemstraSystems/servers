/*
 * creations_ecosystem_server.js
 */

'use strict'

// Path and paths: needs to be at the top
var path = require('../libraries/path');
var paths = require('../paths/paths');

// Babel ES6/JSX Compiler: needs to be before ES6/JSX components
require(path.join(paths.libraries, '/babel-register'));

// Core Node.js modules — path, querystring, http. 
var express = require(path.join(paths.libraries, '/express'));
var logger = require(path.join(paths.libraries, '/morgan'));
var bodyParser = require(path.join(paths.libraries, '/body-parser'));
var compression = require('compression');
var favicon = require('serve-favicon');
var colors = require('colors');
var async = require(path.join(paths.libraries, '/async'));
var request = require(path.join(paths.libraries, '/request'));
var xml2js = require(path.join(paths.libraries, '/xml2js'));
var _ = require(path.join(paths.libraries, '/underscore'));

var swig = require(path.join(paths.libraries, '/swig'));
var React = require(path.join(paths.libraries, '/react'));
// FOR TESTING ONLY
console.log('React version: ', React.version);

//var ReactDOM = require('../libraries/react-dom/server'); // This doesn't find the module correctly
var ReactDOM = require('react-dom/server');
// FOR TESTING ONLY
console.log('ReactDOM version: ', ReactDOM.version);

var Router = require(path.join(paths.libraries, '/react-router'));
// FOR TESTING ONLY
console.log('Router: ', Router);

var routes = require(path.join(paths.routes, '/creations-ecosystem-routes'));

// Third-party NPM libraries — mongoose, express, request.
var mongoose = require(path.join(paths.libraries, '/mongoose'));
// FOR TESTING ONLY
console.log('mongoose: ', mongoose);

// Application files — controllers, models, config.
var Character = require(path.join(paths.models, '/character')); // This requires Mongoose to be set up correctly
// FOR TESTING ONLY
console.log('Character: ', Character);

var config = require(path.join(paths.configurations, '/creations-ecosystem-configurations.js'));
// FOR TESTING ONLY
console.log('Configurations: ', config);

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(paths.publications));

// Database
// We will set the database hostname in creations_ecosystem_configurations.js to avoid hard-coding the value here.
mongoose.connect(config.database);
// FOR TESTING ONLY
console.log('mongoose - connected: ', mongoose); // WORKS!

mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

/** ROUTES - these should best be moved to their individual route files **/
/** These need all be place BEFORE/ABOVE React Middleware **/

/**
 * POST /api/characters
 * Adds new character to the database.
 */
app.post('/api/characters', function(req, res, next) {
  console.log('Route POST /api/characters called');
  // more...
});

 /**
 * GET /api/characters
 * Returns 2 random characters of the same gender that have not been voted yet.
 */
app.get('/api/characters', function(req, res, next) {
  console.log('Route GET /api/characters called');
  // more...
});

 /**
 * PUT /api/characters
 * Update winning and losing count for both characters.
 */
app.put('/api/characters', function(req, res, next) {
  console.log('Route PUT /api/characters called');
  // more...
});

/**
 * GET /api/characters/count
 * Returns the total number of characters.
 */
app.get('/api/characters/count', function(req, res, next) {
  console.log('Route GET /api/characters/count called');
  // more...
});

 /**
 * GET /api/characters/search
 * Looks up a character by name. (case-insensitive)
 */
app.get('/api/characters/search', function(req, res, next) {
  console.log('Route GET /api/characters/search called');
  // more...
});

 /**
 * GET /api/characters/top
 * Return 100 highest ranked characters. Filter by gender, race and bloodline.
 * For example, if we are interested in the Top 100 male characters with Caldari race and Civire bloodline, 
 * this would be the URL path for it:
 * GET /api/characters/top?race=caldari&bloodline=civire&gender=male
 */
app.get('/api/characters/top', function(req, res, next) {
  console.log('Route GET /api/characters/top called');
  // more...
});

 /**
 * GET /api/characters/shame
 * Returns 100 lowest ranked characters.
 */
app.get('/api/characters/shame', function(req, res, next) {
  console.log('Route GET /api/characters/shame called');
  // more...
});

 /**
 * GET /api/characters/:id
 * Returns detailed character information.
 *
 * NOTE: This should come BELOW/AFTER GET /api/characters/ ... routes
 */
app.get('/api/characters/:id', function(req, res, next) {
  console.log('Route GET /api/characters/:id called');
  // more...
});

 /**
 * POST /api/report
 * Reports a character. Character is removed after 4 reports.
 */
app.post('/api/report', function(req, res, next) {
  console.log('Route POST /api/report called');
  // more...
});

 /**
 * GET /api/stats
 * Returns characters statistics.
 */
app.get('/api/stats', function(req, res, next) {
  console.log('Route GET /api/stats called');
  // more...
});  

 // React Middleware
app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      console.log('Inside React Middelware - err: ', err);
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      console.log('Inside React Middelware - redirectLocation: ', redirectLocation);    
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      console.log('Inside React Middelware - renderProps: ', renderProps);
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      console.log('html: ', html);
      var page = swig.renderFile('./views/index.html', { html: html });
      console.log('page: ', page);
      res.status(200).send(page);
    } else {
      console.log('Inside React Middelware - else');
      res.status(404).send('Page Not Found')
    }
  });
});

/**
 * Socket.io stuff.
 */
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
  console.log('Inside IO Sockets - on connection');
  onlineUsers++;

  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function() {
    console.log('Inside IO Sockets - on disconnect');
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

/**
 * Server.listen
 */
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

/* OLD
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
*/
