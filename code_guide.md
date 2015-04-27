## Architecture.
Junto is currently a single page web application. It all gets loaded into the web page at once, as javascript. Only DOM element needed is a container div for the app.

Index.html file is served by a node.js webserver. 

Junto is all about presence. And presence happens in realtime. So Junto uses two services for realtime data. The node.js hosts a websockets (socket.io) server that does two things: it is a [signaling server](http://www.html5rocks.com/en/tutorials/webrtc/infrastructure) and also hosts data that is only transiently relevant to the application (such as how many users are currently online) 


## Folders

* `lib/libraries`: 
