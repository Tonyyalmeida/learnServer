'use strict';


var mongoose = require('mongoose'),
Words = mongoose.model('Words');

exports.list_all_words = function(req, res) {
// getWordsPromise().then(function(words) {
//   res.send(words)
// })
var promise = queryWords.exec();
promise.then(function(words){
  res.send(words);
})
};

function getWordsPromise() {
return Words.find({}, function(err, words) {
    if (err)
      console.log(err)
    return words;
  });
}

var queryWords = Words.find({});

exports.create_a_word = function(req, res) {
  Words.count({}, function(err, count) {
  if (err) {console.log('error')}
  req.body.wordId = count;
  var new_word = new Words(req.body);
  new_word.save(function(err, word) {
    if (err)
      res.send(err);
    res.json(word);
  });});
};




