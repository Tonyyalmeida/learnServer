'use strict';


var mongoose = require('mongoose'),
List = mongoose.model('List');
var Words = mongoose.model('Words');

//Only For Test Purposes
exports.list_all_lists = function(req, res) {
  console.log(req.originalUrl)
List.find({}, function(err, list) {
    if (err)
      res.send(err);
      res.json(list);
  });
};

exports.create_a_list = function(req, res) {
if (req.body.userId) {
  List.count({}, function(err, count) {
  if (err) {console.log('error')}
  req.body.listId = count;
  var new_list= new List(req.body);
  new_list.save(function(err, list) {
    if (err)
      res.send(err);
    res.json(list);
  });});
} else {
 res.send('userId is not defined')
}
};


exports.getListbyListId = function (req, res) {
  if (req.params.listId) {
List.find({listId : req.params.listId}, function(err, list) {
    if (err)
      res.send("could not be found");
      res.json(list);
  });
}
else {
res.send("parameter ListId needs to be defined")
}
};



exports.updateListbyListId = function (req, res) {

if (req.params.listId && req.body.listName) {
List.findOneAndUpdate({listId: req.params.listId }, {listName: req.body.listName, userId: req.body.userId}, {new: true},  function (err, doc) {
if (err) return err;
res.json(doc);
// var response = Object.assign({doc}, { message: "wordByWordId updated successfully odern icht? "} );
//  res.json(response);
})
}
else {
res.send("All word parameter should be defined")
}
};


exports.getAllWordsByUserId = function (req, res) {
//first get List Id,
getListsbyUserIdPromise(req.params.userId).then(function(lists) {
  res.send(lists)
}, function (err) {
  console.log("couldn't get the lists")
})

// for each ListId, get Words, 

// respond
}

function getListsbyUserIdPromise (userId) {
return List.find({userId : userId}, function(err, list) {
    if (err)
     return err;
    // var listArray = [];
    // var listArray = list.forEach(x => x.listId);
    // console.log(listArray)
    return "hi"
    // should return an array of listIds.
  });
}

function getWordsbyListIdPromise () {

}

//============================


//Probably don't need it
exports.update_a_list = function (req, res) {
List.findOneAndUpdate({listId: req.body.listId}, {wordIds: req.body.wordIds}, function (err, doc) {
if (err) return err;
var response = Object.assign({doc}, { message: "updated successfully"} );
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
List.find({userId : req.params.userId}, function(err, list) {
    if (err)
      res.send(err);
      res.json(list);
  });
};

exports.get_words_from_user = function (req, res) {
  var tam = [];
List.find({userId : req.params.userId}, function(err, list) {
    if (err)
     { res.send(err) };
      var counter = 0;
      var umdr = list.length;
      loopThroughWordIdsArray(list, counter, umdr, tam, res);
  });
}
// response has  to be called in the callback to make sense;


exports.get_words_from_list = function (req, res) {
List.find({listId: req.params.listId}, function (err, doc1) {
var wordArray = doc1[0].wordIds[0].split(',');  
Words.find({}).where('wordId').in(wordArray).exec(function (err, doc) {res.send(doc)})}
)}

function getWordsFromWordIds (wordArray) {
var wordThisArray = wordArray[0].split(',');
var h = Words.find({}).where('wordId').in(wordThisArray).exec();
return h;
}

function loopThroughWordIdsArray (wordIdsArray, counter, umdr, tam, res) {
getWordsFromWordIds(wordIdsArray[counter].wordIds).then(
function(doc) {

  tam.push({listId: wordIdsArray[counter].listId, words: doc});
  counter += 1;
if (counter < umdr) {
loopThroughWordIdsArray(wordIdsArray, counter, umdr, tam, res);
} else {
res.json(tam)
}
})}


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