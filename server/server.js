var
    http    = require("http"),            // http server core module
    express = require("express"),           // web framework external module
    io      = require("socket.io"),         // web socket external module
    path = require('path'),
    rtcSignalServer = require("./rtcSignalServer"),
    port = 5002,
    stunservers = [{"url": "stun:stun.l.google.com:19302"}],
    directory = path.resolve(__dirname, 'serve' + '-' + process.env.NODE_ENV);

// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var httpApp = express();

if (process.env.NODE_ENV == 'production') {
  console.log(directory);
  httpApp.use(express.static(directory));
}

// Start Express http server on port 5002
var webServer = http.createServer(httpApp);

webServer.listen(process.env.PORT || port, process.env.IP || "127.0.0.1", function(){
  var addr = webServer.address();
  console.log("server listening at", addr.address + ":" + addr.port);
});

// Start Socket.io so it attaches itself to Express server
var socketServer = io.listen(webServer, { "log level": 2 });

rtcSignalServer(socketServer, stunservers);

