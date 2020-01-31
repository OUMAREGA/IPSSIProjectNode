const sessionController = require('../controllers/sessionController');

// Exporte la fonction anonyme
module.exports = (app) => {
  app.route('/posts/:post_id/comments')
  .get(sessionController.list_all_session_from_a_post)
  .post(sessionController.create_a_session);

  app.route('/comments/:comment_id') // req.params.session_id
  .get(sessionController.get_a_session)
  .put(sessionController.update_a_session)
  .delete(sessionController.delete_a_session);
}

