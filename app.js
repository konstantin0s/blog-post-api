const express = require('express');
const app     = express();
const hbs = require('hbs');
const path    = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
// const users = require('./users.json');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
  )


  mongoose 
  .connect('mongodb://localhost:27017/blogpost', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


  const Users = require('./routes/Users');
  
  app.use('/users', Users);

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