const notesController = require('../controllers/NotesController');


module.exports = (app) => {
  app.route('/notes')
  .post(notesController.note_create)
}