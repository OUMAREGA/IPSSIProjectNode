const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Create model for modules
 * sessionId not required, it will be defined when we will create session
 */
let modulesSchema = new Schema({
  nameModule: {
    type: String,
    required: "Le nom du module est requis !"
  },
  teacherId: {
    type: String,
    required: "L'identifiant de l'intervenant est requis"
  },
  sessionId: {
    type: String
  },
  begin: {
    type: Date,
    default: Date.now
  },
  end: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Modules', modulesSchema);

module.exports = mongoose.model('Modules')