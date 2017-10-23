'use strict';


var mongoose = require('mongoose'),
Words = mongoose.model('Words');

exports.list_all_words = function(req, res) {
  Words.find({}, function(err, words) {
    if (err)
      res.send(err);
     res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
       res.json(words);
  });
};

exports.create_a_word = function(req, res) {
  var new_word = new Words(req.body);
  new_word.save(function(err, word) {
    if (err)
      res.send(err);
           res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(word);
  });
};