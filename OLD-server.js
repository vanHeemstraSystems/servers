/*
* SERVER - The Server
*/
'use strict'
/*
* PATH & PATHS - The Path(s): needs to be at the top
*/
var path = require('../libraries/path');
var paths = require('../paths/paths');
/*
* APPLICATIONS - The Applications
*/
var app = require(path.join(paths.applications, '/application.js'))();
/*
* ENVIRONMENTS - The Environments
* 
* param: app
*/
var environments = require(path.join(paths.environments, '/environments.js'))(app);
/*
* ROUTES - The Routes
* 
* param: app
*/
var routes = require(path.join(paths.routes, '/routes.js'))(app);
/*
* LISTENERS - The Listeners: always put last
* 
* param: app
*/
var listeners = require(path.join(paths.listeners, '/listeners.js'))(app);
