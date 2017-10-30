'use strict';


var mongoose = require('mongoose'),
List = mongoose.model('List');
var Words = mongoose.model('Words');

exports.list_all_lists = function(req, res) {
  console.log(req.originalUrl)
List.find({}, function(err, list) {
    if (err)
      res.send(err);
      res.json(list);
  });
};

exports.create_a_list = function(req, res) {
  console.log(req.body.wordIds)
  List.count({}, function(err, count) {
  if (err) {console.log('error')}
  req.body.listId = count;
  var new_list= new List(req.body);
  new_list.save(function(err, list) {
    if (err)
      res.send(err);
    res.json(list);
  });});
};

exports.update_a_list = function (req, res) {
console.log(req.body)
List.findOneAndUpdate({listId: req.body.listId}, {wordIds: req.body.wordIds}, function (err, doc) {
if (err) return err;
var response = Object.assign({doc}, { message: "hi"} );
 res.json(response);
})
};

// exports.delete_a_list = function (req, res) {
// List.findOneAndUpdate({listId: req.body.listId}, {wordIds: req.body.wordIds}, function (err, doc) {
// if (err) return err;
// var response = Object.assign({doc}, { message: "hi"} );
//  res.json(response);
// })
// };
// actually not needed


exports.get_all_lists_from_user = function (req, res) {
console.log(req.params)
List.find({userId : req.params.userId}, function(err, list) {
    if (err)
      res.send(err);
      res.json(list);
  });
};

exports.get_words_from_list = function (req, res) {
List.find({listId: req.params.listId}, function (err, doc1) {
var wordArray = doc1[0].wordIds[0].split(',');  
Words.find({}).where('wordId').in(wordArray).exec(function (err, doc) {res.send(doc)})}
)}
//Words.find({}).where('wordId').in([28, 29]).exec(function (err, doc) {res.send(doc)})}


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