"use strict";

const fs = require("fs");
const express = require('express');
const path = require('path');
const app = express();


const port = 3000;


app.use(express.static(path.join(__dirname, 'static')));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'static/index.html'))
});




app.listen(port, function () {
});
