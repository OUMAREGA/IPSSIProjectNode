const sessionController = require('../controllers/sessionController');

// Exporte la fonction anonyme
module.exports = (app) => {
  app.route('/sessions')
  .get(sessionController.list_all_sessions)
  .post(sessionController.session_register);

  app.route('/sessions/:session_id') // req.params.session_id
  .get(sessionController.get_a_session)
  .put(sessionController.update_a_session)
  .delete(sessionController.delete_a_session);
}

