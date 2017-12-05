var express = require('express'),
  app = express(),
  port = process.env.PORT || 3101,
  mongoose = require('mongoose'),
  Task = require('./models/WordModel'), //created model loading here
  Task2 = require('./models/ListModel'), //created model loading here
  Users = require("./models/UserModel"),
  bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var LocalStrategy = require('passport-local').Strategy;

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test',  {
  useMongoClient: true,
  /* other options */
}, function (err) {
  console.log('could not connect');
}); 

//Standard for validator;
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

var routes = require('./routes/routes')(app, passport); //importing route
//routes(app); //register the route
app.listen(port);



// app.post('/login', passport.authenticate('local'), function(req, res) {
// req.send("hi");
// });
console.log('todo list RESTful API server started on: ' + port);