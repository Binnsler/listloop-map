var express = require('express');
var app = express();
var http = require('http');
var path = require('path');

app.get('*', function(req, res){
  res.sendFile(path.resolve('../index.html'));
});

const port = process.env.port || 3030;
const server = http.createServer(app);
server.listen(port, function(){
  console.log('Listening on porto: ', port);
});
