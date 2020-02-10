// src/api/models/userModel.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let sessionSchema = new Schema({
  nom_session: {
    type: String,
    required:"Le nom de session est requis"
  },
  promo: {
    type: String,
    required: "Le nom de la promo est requis"
  },
  debut: {
    type: Date,
    required: "La date de début est requis"
  },
fin: {
    type: Date,
    required: "La date de fin est requis"
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Session', sessionSchema);

module.exports = mongoose.model('Session');
