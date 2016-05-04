/*
 * index.js
 */
var ServerExpress = require(__dirname+'/express.js');

var self = this; // set the context locally, for access protection

/**
 * Create a new Server that let users create sub-server.
 * @return {Server}
 */
function Server() { 
  // add key value pairs here
  // self's are not directly publicly accessible, only through their public method(s)
  // use self's here for protection from direct access
  self._foo = 'bar'; // will be set, before passing on to mapping

}

/**
 * Create a new MainsMain object.
 * @return {MainsMain}
 */
Server.prototype.express = function() {
  return new ServerExpress();
}

module.exports = Server;