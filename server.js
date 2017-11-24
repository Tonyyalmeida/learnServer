var express = require('express'),
  app = express(),
  port = process.env.PORT || 3101,
  mongoose = require('mongoose'),
  Task = require('./models/WordModel'), //created model loading here
  Task2 = require('./models/ListModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test',  {
  useMongoClient: true,
  /* other options */
}, function (err) {
  console.log('could not connect');
}); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});


var routes = require('./routes/routes'); //importing route
routes(app); //register the route
app.listen(port);


console.log('todo list RESTful API server started on: ' + port);