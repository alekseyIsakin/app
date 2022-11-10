"use strict";

const fs = require("fs");
const express = require('express');
const path = require('path');
const app = express();
const jsonParser = express.json();


const pg = require('pg');

const config = {
  host: 'localhost',
  // Do not hard code your username and password.
  // Consider using Node environment variables.
  user: 'postgres',
  password: 'uliya1992',
  database: 'medTestsDB',
  port: 5432,
  ssl: false
};

const client = new pg.Client(config);

client.connect(err => {
  if (err) throw err;
  else { queryDatabase(); }
});


function queryDatabase() {

  console.log(`Running query to PostgreSQL server: ${config.host}`);

};


const port = 3000;

app.use(express.static(path.join(__dirname, 'static')));

app.get('/test_builder', function (req, res) {
  res.sendFile(path.join(__dirname, 'static/html/test_builder.html'))
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'static/html/index.html'))
});


app.post("/test", jsonParser, function (request, response) {
  console.log(request.body);
  if (!request.body) return response.sendStatus(400);

  let filePath = path.join(__dirname, `static/tests/${request.body.testUUID}.json`)

  fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    if (!err)
      response.json(JSON.parse(data));
    else
      console.log(err)
  })
});

app.post("/postgrestest", jsonParser, function (request, response) {
  console.log(request.body);
  if (!request.body) return response.sendStatus(400);

  var info_response = {}

  const query_questions = 'SELECT * FROM msdtest_questions;';
  client.query(query_questions).then(res => {
    info_response["questions"] = res.rows;
    const query_answers = 'SELECT * FROM msdtest_answers;';
    client.query(query_answers).then(res => {
      info_response["answers"] = res.rows;
      response.json(info_response)
    })
  })
  
    .catch(err => {
      console.log(err);
    });

});


app.listen(port, function (error) {
  if (!error)
    console.log("Server is Listening at Port 3000!");
  else
    console.log("Error Occurred");
});
