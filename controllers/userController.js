'use strict';


var mongoose = require('mongoose'),
Users = mongoose.model('Users');

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