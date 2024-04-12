// Create web server
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

// Read comments.json
var comments = require("./comments.json");

// Use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get comments
app.get('/comments', function (req, res) {
   console.log("GET Request");
   res.end(JSON.stringify(comments));
})

// Post comments
app.post('/comments', function (req, res) {
   console.log("POST Request");
   var comment = {
      "name": req.body.name,
      "comment": req.body.comment
   }
   comments.push(comment);
   fs.writeFile(__dirname + "/comments.json", JSON.stringify(comments), function(err) {
      if(err) {
         return console.log(err);
      }
      console.log("The file was saved!");
   });
   res.end(JSON.stringify(comments));
})

// Put comments
app.put('/comments/:id', function (req, res) {
   console.log("PUT Request");
   var id = req.params.id;
   var comment = {
      "name": req.body.name,
      "comment": req.body.comment
   }
   comments[id] = comment;
   fs.writeFile(__dirname + "/comments.json", JSON.stringify(comments), function(err) {
      if(err) {
         return console.log(err);
      }
      console.log("The file was saved!");
   });
   res.end(JSON.stringify(comments));
})

// Delete comments
app.delete('/comments/:id', function (req, res) {
   console.log("DELETE Request");
   var id = req.params.id;
   comments.splice(id, 1);
   fs.writeFile(__dirname + "/comments.json", JSON.stringify(comments), function(err) {
      if(err) {
         return console.log(err);
      }
      console.log("The file was saved!");
   });
   res.end(JSON.stringify(comments));
})

// Listen to port 8081
var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Server listening at http://%s:%s", host, port);
})

// Test with curl
// curl -X POST -d "name=John&comment=Hello" http://localhost:8081/comments
// curl -X PUT -d "name=John