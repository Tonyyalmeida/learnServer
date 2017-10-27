'use strict';


var mongoose = require('mongoose'),
List = mongoose.model('List');

exports.list_all_words = function(req, res) {
List.find({}, function(err, list) {
    if (err)
      res.send(err);
      res.json(list);
  });
};

// exports.create_a_word = function(req, res) {
//   Words.count({}, function(err, count) {
//   if (err) {console.log('error')}
//   req.body.wordId = count;
//   var new_word = new Words(req.body);
//   new_word.save(function(err, word) {
//     if (err)
//       res.send(err);
//     res.json(word);
//   });});
// };