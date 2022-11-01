"use strict";

const fs = require("fs");
const express = require('express');
const path = require('path');
const app = express();
const jsonParser = express.json();


const port = 3000;


app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'static/index.html'))
});


app.post("/test", jsonParser, function (request, response) {
  console.log(request.body);
  if(!request.body) return response.sendStatus(400);

  let filePath = path.join(__dirname, `static/tests/${request.body.testUUID}.json`)
  
  fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) =>{
    if (err)
      console.log(err)
  })
});


app.listen(port, function (error) {
  if(!error)
  console.log("Server is Listening at Port 3000!");
else
  console.log("Error Occurred");
});
