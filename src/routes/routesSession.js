const sessionController = require('../controllers/sessionController');
const middleware = require("../middleware/jwtMiddleware")
// Exporte la fonction anonyme
module.exports = (app) => {
  app.route('/sessions')
  .get([middleware.verify_token,middleware.is_admin,middleware.is_teacher],sessionController.list_all_sessions)
  .post([middleware.verify_token,middleware.is_admin],sessionController.session_register);

  app.route('/sessions/:session_id') // req.params.session_id
  .get([middleware.verify_token,middleware.is_admin,middleware.is_teacher],sessionController.get_a_session)
  .put([middleware.verify_token,middleware.is_admin],sessionController.update_a_session)
  .delete([middleware.verify_token,middleware.is_admin],sessionController.delete_a_session);
}

