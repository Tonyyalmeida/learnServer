'use strict';
module.exports = function(app) {
   var list =   require('../controllers/listController');
   var wordPair = require('../controllers/wordController');
 

  // todoList Routes
  app.route('/words')
    .get(wordPair.list_all_words)
    .post(wordPair.create_a_word);
 app.route('/list')
    .get(list.list_all_words)
//   app.route('/words/:wordId')
//     .get(todoList.read_a_task)
//     .put(todoList.update_a_task)
//     .delete(todoList.delete_a_task);
};