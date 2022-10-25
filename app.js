"use strict";

import { get_stupid_test } from './test';

const express = require('express');
const path = require('path');
const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

const port = 3000;

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'static')));


app.get('/', function (req, res) {
  res.render('index', {
    title:'awwsd',
    message:'sad',
    show_form:true});
    // console.log(`receive get [${req.query.asd}]`);
});

app.post('/', function (req, res) {
  res.render('index', {
    title:'awwsd',
    message:`you choose something ${req.body.num1}`,
    show_form:false})

    // console.log(`receive post [${req.body.num1}]`);

});




app.listen(port, function () {
});
