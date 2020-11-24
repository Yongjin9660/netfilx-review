const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mongooseAutoInc = require('mongoose-auto-increment');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Session = require('express-session');
const flash = require('connect-flash');
var MongoDBStore = require('connect-mongodb-session')(Session);

mongoose.connect('mongodb://localhost:27017/Lab10-201620956', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongooseAutoInc.initialize(mongoose.connection);

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/api', indexRouter);
app.use('/login', loginRouter);
app.use(flash());

var store = new MongoDBStore({
  url: "mongodb://localhost:27017",
  collection: 'WebSessions'
});

store.on('error', function(error) {//에러처리
  console.log(error);
});

app.use(Session({
  secret:'mymymymymyna', 
  resave:false,
  saveUninitialized:true,
  rolling:true,
  cookie:{maxAge:1000*60*60},
  store: store
}));
app.use(passport.initialize());
app.use(passport.session());

app.listen(4000, () => console.log('Node.js Server is running on port 4000...'));