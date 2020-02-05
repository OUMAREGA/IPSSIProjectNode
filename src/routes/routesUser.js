const usersController = require('../controllers/UsersController');


module.exports = (app) => {
  app.route('/users')
  .post(usersController.create_user);

  app.route('/login')
  .post(usersController.login_user);
}