const express = require('express');
const app     = express();
const hbs = require('hbs');
const path    = require('path');
// const users = require('./users.json');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  // res.json(users);
  res.render('index')
});

// app.get('/api/userz', (req, res, next) => {
//   // res.json(users);
// });



app.listen(3001, ()=> {
  console.log("listening")
});