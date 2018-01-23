'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ListSchema = new Schema({
  userId: {
    type: Number,
  },
  listId: {
    type: Number,
    index: true,
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  update_date: {
    type: Date,
    default: Date.now
  },
  listName: {
    type: String,
  },
  listStatus: {
  type: Number,
  default: 0
  },
});

module.exports = mongoose.model('List', ListSchema);