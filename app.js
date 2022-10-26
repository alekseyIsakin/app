"use strict";

var tests = require('./test');

const express = require('express');
const path = require('path');
const app = express();
const fs = require("fs");

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

const port = 3000;
// var test_list = [
//   {
//     uuid: "00000000-0000-0000-0000-000000000001",
//     name: "Тест самоопределения тревоги Д. Шихана",
//   },
//   {
//     uuid: "00000000-0000-0000-0000-000000000002",
//     name: "Тест на репрезентативные системы",
//   }]


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'static')));


app.get('/', function (req, res) {

  res.render('index', {
    title:'awwsd',
    message:'sad',
    test_list: tests.test_list(),
    show_form:true});
    // console.log(`receive get [${req.query.asd}]`);
});

app.post('/', function (req, res) {
  var uuid = req.body.test_selector
  let p = path.join(__dirname, 'static/tests/' + uuid + '.json')
  let t = JSON.parse(fs.readFileSync(p, "utf8"));
  
  res.render('index', {
    title:'awwsd',
    message:t.name,
    message_id:uuid,
    show_form:false})

    // console.log(`receive post [${req.body.num1}]`);

});




app.listen(port, function () {
});
