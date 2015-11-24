/*
* SERVER - The Server
*/
/*
* APPLICATIONS - The Applications
*/
var app = require('../applications/application.js');
/*
* ENVIRONMENTS - The Environments
* 
* param: app
*/
var environments = require('../environments/environment.js')(app);
/*
* ROUTES - The Routes
* 
* param: app
*/
var routes = require('../routes/route.js')(app);
/*
* LISTENERS - The Listeners (always put last)
* 
* param: app
*/
var listeners = require('../listeners/listener.js')(app);
