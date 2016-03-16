/*
* SERVER - The Server
*/

'use strict'

// PATH & PATHS - The Path(s): needs to be at the top
var path = require('../libraries/path');
var paths = require('../paths/paths');

/*
* APPLICATIONS - The Applications
*/
//OLD var app = require('../applications/application.js');
var app = require(path.join(paths.applications, '/application.js'));
/*
* ENVIRONMENTS - The Environments
* 
* param: app
*/
//OLD var environments = require('../environments/environment.js')(app);
var environments = require(path.join(paths.environments, '/environment.js'))(app);
/*
* ROUTES - The Routes
* 
* param: app
*/
//OLD var routes = require('../routes/routes.js')(app);
var routes = require(path.join(paths.routes, '/routes.js'))(app);
/*
* LISTENERS - The Listeners (always put last)
* 
* param: app
*/
//OLD var listeners = require('../listeners/listener.js')(app);
var listeners = require(path.join(paths.listeners, '/listener.js'))(app);
