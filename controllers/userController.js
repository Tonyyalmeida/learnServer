'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var LocalStrategy = require('passport-local').Strategy;
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var router = express.Router();
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
app.set("superSecret", "fromControllerhello");


// var jwtOptions = {}
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
// jwtOptions.secretOrKey = 'tasmanianDevil';

// var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
//   console.log('payload received', jwt_payload);
//   // usually this would be a database call:
//   var user = users[_.findIndex(users, {id: jwt_payload.id})];
//   if (user) {
//     next(null, user);
//   } else {
//     next(null, false);
//   }
// });

exports.list_all_users = function(req, res) {
  Users.find({}, function(err, users) {
    if (err)
      { res.send(err); }
       res.json(users);
  });
};

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
   Users.count({}, function(err, count) {
     if (err) throw err;
  var newUser = new Users({
			userId: count,
      emailAddress: email,
			userName: username,
			password: password1
		});
		createUser(newUser, function(err, user){
			if(err) throw err;
		});
    res.send(username + " with email " + email +  " has been registered successfully");

   })  
    //normaly would call function to generate token; or not?  -> NO
    //Sanitization is still missing?
  }
})}}

exports.locallogin = new LocalStrategy(
  function(username, password, done) {
   getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false);
   	}
   	comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
        var token = createToken(user);
   			return done(null, token);
       }      
       else {
   			return done(null, false);
   		}
   	});
   });
  });

 function comparePassword(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
function getUserByUsername (username, callback) {
	var query = {userName: username};
	Users.findOne(query, callback);
}

function createToken(user) {
  var payload = {
  userName: user.userName,
  userId: user.userId
}
var token = jwt.sign(payload, app.get('superSecret'), {
  expiresIn: "1h"// expires in 24 hours
});
return {message: "klappt", token: token};
}


