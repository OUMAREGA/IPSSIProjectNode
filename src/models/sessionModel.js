// src/api/models/userModel.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let sessionSchema = new Schema({
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

mongoose.model('Session', sessionSchema);

module.exports = mongoose.model('Session');
