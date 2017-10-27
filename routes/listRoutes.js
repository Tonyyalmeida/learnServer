'use strict';
module.exports = function(app) {
  var list = require('../controllers/listController');

  // todoList Routes
  app.route('/list')
    .get(list.all_lists)
    .post(list.create_a_word);


//   app.route('/words/:wordId')
//     .get(todoList.read_a_task)
//     .put(todoList.update_a_task)
//     .delete(todoList.delete_a_task);
};