'use strict';


var mongoose = require('mongoose'),
Words = mongoose.model('Words');

exports.list_all_words = function(req, res) {

// res.send("hi");
getWordsPromise().then(function(words) {
  res.send(words)
}, function (err) {
  console.log("couldn't get the words")
})
// queryWords.exec().then(function(words){
//   res.send(words);
// })
};

//better solution because I can construct a query
function getWordsPromise() {
return Words.find({}, function(err, words) {
    if (err)
      return err;
    return words;
  });
}

// Alternative solution
// var queryWords = Words.find({}); 

exports.create_a_word = function(req, res) {
if (req.body.vn && req.body.en && req.body.listId)
{
  Words.count({}, function(err, count) {
  if (err) {console.log('error')}
  req.body.wordId = count;
  var new_word = new Words(req.body);
  new_word.save(function(err, word) {
    if (err)
      res.send(err);
    res.json(word);
  });});
}
else {res.send("Body Parameter vn, en and listId need to be defined")}
};

exports.getWordbyWordId = function (req, res) {
if (req.params.wordId) {
Words.find({wordId : req.params.wordId}, function(err, word) {
    if (err)
      res.send(err);
      res.json(word);
  });
}
else {
res.send("parameter wordId needs to be defined")
}
};


exports.updateWordbyWordId  = function (req, res) {
 console.log(req.params.wordId, Object.keys(req.body));
if (req.params.wordId && req.body.vn && req.body.en && req.body.status && req.body.exampleUseEn && req.body.exampleUseVn) {
Words.findOneAndUpdate({wordId: req.params.wordId},{vn: req.body.vn, en: req.body.en, status: req.body.status} , {new: true}, function (err, doc) {
if (err) return err;
var response = Object.assign({doc}, { message: "wordByWordId updated successfully"} );
 res.json(response);
})
}
else {
res.send("All word parameter should be defined")
}
};
//improvement with Object.keys and loop to check which properties need to be updated.


