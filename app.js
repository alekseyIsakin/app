const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended:true
}));

const port = 3000;

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'static')));


app.get('/', function (req, res) {
  res.render('index', {
    title:'awwsd',
    message:'sad',
    show_form:true});
});

app.post('/', function (req, res) {
  res.render('index', {
    title:'awwsd',
    message:`you choose something ${req.body.num1}`,
    show_form:false})

  console.log()
});




app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
