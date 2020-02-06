const usersController = require('../controllers/UsersController');


module.exports = (app) => {
  app.route('/users')
  .post(usersController.create_user)
  .get(usersController.fetch_users)

  app.route('/users/:id')
     .put(usersController.update_user)
     .delete(usersController.delete_user)

  app.route('/login')
  .post(usersController.login_user);
}