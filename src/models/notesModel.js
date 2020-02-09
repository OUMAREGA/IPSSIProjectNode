const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Module = require("./modulesModel")
const User = require("./userModel")

let notesSchema = new Schema({
  studentId: {
    type: String,
    required: "L'identifiant de l'étudiant est requis",
    validate: { //on vérifie que l'id du module existe avant de l'ajouter
      validator: (value) => {
        return User.findOne({ _id: value, roleId: "étudiant"},() => Promise.resolve(true))
          .catch(() => Promise.resolve(false))
          
      },
      message: "L'étudiant n'existe pas"
    }

  },
  moduleId: {
    type: String,
    required: "L'identifiant du module est requis",
    validate: { //on vérifie que l'id du module existe avant de l'ajouter
      validator: (value) => {
        return Module.findById(value)
          .then(() => Promise.resolve(true))
          .catch(() => Promise.resolve(false))
      },
      message: "Le module n'existe pas"
    }
  },
  note: {
    type: Number,
    validate: {
      validator: (value) => {
        if (value > 0 && value <= 20)
          return Promise.resolve(true)
        else
          return Promise.resolve(false)
      },

      message: "Valeur incorrecte"
    },
    required: "La note est requise"
  },

  message: {
    type: String,
    required: "Un message est requis"
  }

});

notesSchema.index({ studentId: 1, moduleId: 1 }, { unique: true }) //on associe studentId et moduleId ensemble en leur donnant un index identique
mongoose.model('Notes', notesSchema);

module.exports = mongoose.model('Notes');