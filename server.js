var express = require('express'),
  app = express(),
  port = process.env.PORT || 3101,
  mongoose = require('mongoose'),
  mongodb = require('mongodb').MongoClient;
  Task = require('./models/wordModel'), //created model loading here
  Task2 = require('./models/ListModel'), //created model loading here
  Users = require("./models/UserModel"),
  bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var LocalStrategy = require('passport-local').Strategy;
const request = require('request');
request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage. 
  }
});


// mongoose instance connection url connection
// mongoose.Promise = global.Promise;
// db = connect("localhost:27017/myDatabase");

mongoose.connect('mongodb://master:master@ds127300.mlab.com:27300/test123',  {
  useMongoClient: true,
  /* other options */
}, function (err) {
  console.log('could not connect');
}); 

// mongodb.connect('mongodb://master:master@ds127300.mlab.com:27300/test123', function(err, db) {
//  if (err) console.log(err);
//   console.log("Connected correctly to server!")});
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
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
   next();
});

app.use("/drei", function (req, res) {
  request('http://www.google.com', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json(body) // Show the HTML for the Google homepage. 
    }
  });
})

var routes = require('./routes/routes')(app, passport); //importing route
//routes(app); //register the route
app.listen(port);



// app.post('/login', passport.authenticate('local'), function(req, res) {
// req.send("hi");
// });
console.log('todo list RESTful API server started on: ' + port);