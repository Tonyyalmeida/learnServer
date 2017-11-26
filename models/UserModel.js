'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  userId: {
    type: Number,
  },
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
  emailAddress: {
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
      type: String,
      default: "defaultUser"
  }
});

module.exports = mongoose.model('Users', UserSchema);