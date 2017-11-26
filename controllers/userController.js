'use strict';


var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

exports.list_all_users = function(req, res) {
  Users.find({}, function(err, users) {
    if (err)
      { res.send(err); }
     res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
       res.json(users);
  });
};

exports.create_a_user = function(req, res) {
  var newUser = new Users(req.body);
  newUser.save(function(err, user) {
    if (err)
     { res.send(err) }
           res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(user);
  });
};


/////////////////////////////////////////// from other tutorial
exports.login =  function(req, res) {
  if(req.body.name && req.body.password){
    var name = req.body.name;
    var password = req.body.password;
  }
  // usually this would be a database call:
  var user = users[_.findIndex(users, {name: name})];
  if( ! user ){
    res.status(401).json({message:"no such user found"});
  }

  if(user.password === req.body.password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = {id: user.id};
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({message: "ok", token: token});
  } else {
    res.status(401).json({message:"passwords did not match"});
  }
}
//////////////////////////////////////////////



//module.exports = comparePassword;
//taken Straight from bcrypt docs
function createUser (newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

exports.signup = function (req, res) {
	  var email = req.body.email;
    var username = req.body.username;
    var password1 = req.body.password1;
    var password2 = req.body.password2;
	req.checkBody('username', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password1', 'Password is required').notEmpty();
	req.checkBody('password1', 'Password should be at least 8 characters long').isLength({min: 2, max: 30});
 req.checkBody('password2', 'Please repeat the password').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password1);
    	var errors = req.validationErrors(); // an array of objects
	if(errors){
		res.json(errors);
		}
	else {
  Users.find({emailAddress: email}, function (err, foundUser) {
  if (err) throw err;
  if (typeof foundUser[0] !== "undefined") 
    {
      console.log(typeof foundUser[0]); res.send("Email address is already registered")}
  else {
    console.log(typeof foundUser[0]);
    var newUser = new Users({
			emailAddress: email,
			userName: username,
			password: password1
		});
		createUser(newUser, function(err, user){
			if(err) throw err;
		});
    res.send(username + " with email " + email +  " has been registered successfully");
    //normaly would call function to generate token; or not? 
  }
  })}}
 

// var newUser = new Users({
// 			emailAddress: email,
// 			userName: username,
// 			password: password1
// 		});
// 		createUser(newUser, function(err, user){
// 			if(err) throw err;
// 		});
//     res.send(username + " with email " + email +  " has been registered successfully");
// 		// whats is the avantage of using redirect? 
// 		}};