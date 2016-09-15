var express = require('express');
var app = express();
var http = require('http');
var path = require('path');

app.use(express.static(__dirname + '/../')); // Serve from root directory

app.get('*', function(req, res){
  res.sendFile(path.resolve('./index.html'));
});

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, function(){
  console.log('Listening on port: ', port);
});
