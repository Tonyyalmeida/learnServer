'use strict';
module.exports = function(app) {
   var list =   require('../controllers/listController');
   var wordPair = require('../controllers/wordController');
 

  // todoList Routes
  app.route('/words')
    .get(wordPair.list_all_words)
    .post(wordPair.create_a_word);
 app.route('/list')
    .get(list.list_all_lists).post(list.create_a_list);

app.route('/newlist').post(list.update_a_list);
//app.route('/list/:userId').get(list.get_all_lists_from_user)

app.route('/word/:listId').get(list.get_words_from_list);

//  app.route(':listId').get(list.get_words_from_list);


//   app.route('/words/:wordId')
//     .get(todoList.read_a_task)
//     .put(todoList.update_a_task)
//     .delete(todoList.delete_a_task);
};