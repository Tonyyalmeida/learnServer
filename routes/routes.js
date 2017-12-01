'use strict';
module.exports = function(app) {
   var users = require('../controllers/userController');
   var list =   require('../controllers/listController');
   var wordPair = require('../controllers/wordController');
  // todoList Routes
 app.route('/all_words').get(wordPair.list_all_words);
 app.route('/all_lists').get(list.list_all_lists);
 app.route('/words').post(wordPair.create_a_word);
 app.route('/words/:wordId').get(wordPair.getWordbyWordId).post(wordPair.updateWordbyWordId);
 app.route('/lists').post(list.create_a_list);
 app.route('/lists/:listId').get(list.getListbyListId).post(list.updateListbyListId);
 app.route('/users/:userId/words').get(list.getAllWordsByUserId);
 app.route('/users').post(users.signup);
 app.route('/all_users').get(users.list_all_users);
 //app.route('/login').post(users.login);
  

//app.route('/list/:userId').get(list.get_words_from_user)



//  app.route(':listId').get(list.get_words_from_list);


//   app.route('/words/:wordId')
//     .get(todoList.read_a_task)
//     .put(todoList.update_a_task)
//     .delete(todoList.delete_a_task);
};