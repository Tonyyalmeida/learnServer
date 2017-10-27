'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var WordSchema = new Schema({
  wordId: {
    type: Number,
  },
  en: {
    type: String,
  },
  vn: {
    type: String,
  },
    exampleUseEn: {
    type: String,
  },
    exampleUseVn: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  update_date: {
    type: Date,
    default: Date.now
  },
  status: {
      type: Number,
      default: 0
  }
});

module.exports = mongoose.model('Words', WordSchema);