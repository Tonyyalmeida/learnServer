'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ListSchema = new Schema({
  userId: {
    type: Number,
  },
  wordIds: {
    type: Array
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  update_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('List', ListSchema);