const express = require('express');
const app     = express();
const hbs = require('hbs');
const path    = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cookieParser = require('cookie-parser');

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
  app.use(cookieParser());


  mongoose 
  .connect('mongodb://localhost:27017/blogpost', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

    //add session
    app.use(session({
      secret: "basic-auth-secret",
      cookie: { maxAge: 60000 },
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 24 * 60 * 60 // 1 day
      })
    }));


  const Users = require('./routes/Users');
  app.use('/users', Users);

  const Articles = require('./routes/Articles');
  app.use('/articles', Articles);

// app.get('/', (req, res, next) => {
//   // res.json(users);
//   res.render('index')
// });

app.listen(3001, ()=> {
  console.log("listening")
});