# servers
The Servers Subtree

Servers are started from the subtree 'supervisors'.
So **not** from within this 'servers' repository itself.

TIP: To imitate a request (e.g. GET, POST, PUT) on the command line just type:

````
http GET  http://<host>:<port>/<path>/<file>          
````
This will make a GET  request to the server

````
http POST http://<host>:<port>/<path>/<file> bar=foo  
````
This will make a POST request to the server, for the key-value pair bar=foo

---

TO DO: consider replacing ExpressJS by HapiJS (https://github.com/hapijs/hapi)
 
