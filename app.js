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


app.get('/preview', function (req, res) {
  res.sendFile(path.join(__dirname, 'static/html/only_css.html'))
})
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'static/html/main_page.html'))
});


app.post("/test", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);

  let filePath = path.join(__dirname, `static/tests/${req.body.uuid}.json`)

  fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    if (!err)
      res.json(JSON.parse(data));
    else
      console.log(err)
  })
})

app.get("/test", function (req, res) {
  if ('custom' in req.query) {
    res.sendFile(path.join(__dirname, 'static/html/index.html'))
  }

  if ('uuid' in req.query) {
    let filePath = path.join(__dirname, `static/tests/${req.query.uuid}.json`)

    fs.stat(filePath, { encoding: 'utf-8' }, (err) => {
      if (err == null) {
        res.sendFile(path.join(__dirname, 'static/html/index.html'))
      } else {
        res.status(404).send('Test not found');
      }
    })
  }



});


app.listen(port, function (error) {
  if (!error)
    console.log("Server is Listening at Port 3000!");
  else
    console.log("Error Occurred");
});
