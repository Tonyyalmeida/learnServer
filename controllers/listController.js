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
  req.body.listId = count+1;
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


exports.getWordsbyListId = function (req, res) {
  if (req.params.listId) {
Words.find({listId : req.params.listId}, function(err, list) {
    if (err)
      {res.send("could not be found");}
      res.send(list);
  });
}
else {
res.send("parameter ListId needs to be defined")
}
};
//welchen sinn macht das?


exports.updateListbyListId = function (req, res) {
if (req.params.listId && req.body.listName) {
List.findOneAndUpdate({listId: req.params.listId }, {listName: req.body.listName}, {new: true},  function (err, doc) {
if (err) return err;
res.json([doc, "all good"]);
// var response = Object.assign({doc}, { message: "wordByWordId updated successfully odern icht? "} );
//  res.json(response);
})
}
else {
res.send("All word parameter should be defined")
}
};

exports.getListStatusByListId = function (req, res) {
  if (req.params.listId) {
  List.find({listId: req.params.listId }, function (err, doc) {
  if (err) return err;
  res.json([doc, "all good"]);
  // var response = Object.assign({doc}, { message: "wordByWordId updated successfully odern icht? "} );
  //  res.json(response);
  })
  }
  else {
  res.send("All word parameter should be defined")
  }
  };

exports.updateListStatusbyListId = function (req, res) {
  if (req.body.listId && req.body.listStatus !== 'undefined' && req.body.listName) {
  List.findOneAndUpdate({listId: req.body.listId }, {listStatus: req.body.listStatus, listName: req.body.listName}, {new: true},  function (err, doc) {
  if (err) return err;
  res.json([doc, "all good"]);
  })
  }
  else {
  //  (req.params.listId && req.body.listStatus && req.body.listName)
  res.send("plase add all required parameters");
  }
  };

exports.getAllListsByUserId = function (req, res) {
//first get List Id,
getListsbyUserIdPromise(req.params.userId).then(function(lists) {
res.json(lists)})
//return lists.map( (x) => [x.listId, x.listName])}).then(n => res.json(n));
}


exports.getAllWordsByUserId = function (req, res) {
//first get List Id,
getListsbyUserIdPromise(req.params.userId).then(function(lists) {
 var listArray = lists.map( x => x.listId);

 Promise.all(listArray.map(x => getWordsbyListIdPromise(x))).then(values => res.send({listArray, values}));
//  getWordsbyListIdPromise(listIndex).then(function(wordsList) {
//    res.send(wordsList);
//  })


// this should call another Promise
}, function (err) {
  console.log("couldn't get the lists")
})

// for each ListId, get Words, 

// respond
}

function getListsbyUserIdPromise (userId) {
return List.find({userId : userId}, function(err, list) {
  //  if (err)
   //  return err;
    // var listArray = [];
    // var listArray = list.forEach(x => x.listId);
    // console.log(listArray)
  return list;
    // should return an array of listIds.
  });
}

function getWordsbyListIdPromise (listId) {
return Words.find({listId: listId}, function( err, wordsList) {
  return wordsList;
} )
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