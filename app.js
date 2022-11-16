"use strict";

const fs = require("fs");
const express = require('express');
const path = require('path');
const app = express();
const jsonParser = express.json();


const port = 3000;


app.use(express.static(path.join(__dirname, 'static')));

app.get('/test_builder', function (req, res) {
  res.sendFile(path.join(__dirname, 'static/html/test_builder.html'))
});


app.get('/preview', function (req, res)  {
  res.sendFile(path.join(__dirname, 'static/html/only_css.html'))
})
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'static/html/main_page.html'))
});


app.get("/test", function (req, res) {
  res.sendFile(path.join(__dirname, 'static/html/index.html'))
});


app.listen(port, function (error) {
  if (!error)
    console.log("Server is Listening at Port 3000!");
  else
    console.log("Error Occurred");
});
