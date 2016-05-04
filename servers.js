/*
 * servers.js
 */
var ServersServer = require(__dirname+'/server.js');

/**
 * Create a new Servers that let users create sub-servers.
 * @return {Servers}
 */
function Servers() { }

/**
 * Create a new ServersServer object.
 * @return {ServersServer}
 */
Servers.prototype.server = function() {
  return new ServersServer();
}

module.exports = Servers;
