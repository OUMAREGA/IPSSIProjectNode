const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let notesSchema = new Schema({
  studentId: {
    type: String,
    required: "L'identifiant de l'étudiant est requis !",
     
  },
  moduleId: {
    type: String,
    required: "L'identifiant du module est requis !"
  },
  note: {
    type: float,
    required: () => {
        return this.note >0 || this.note <= 20;

    }
  },

  message: {
      type: String,
      required: "Un message est requis !"
  }

});

mongoose.model('Notes', notesSchema);

module.exports = mongoose.model('Notes');