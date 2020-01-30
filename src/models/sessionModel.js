// src/api/models/userModel.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  nom_session: {
    type: String,
    required: true,
    unique: true
  },
  promo: {
    type: String,
    required: true
  },
  annee: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Session', userSchema);

module.exports = mongoose.model('Session');
