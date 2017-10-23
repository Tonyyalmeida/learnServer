'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var wordPairSchema = new Schema({
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
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: Number,
      default: 0
  }]}
});

module.exports = mongoose.model('Words', wordPairSchema);