const usersController = require('../controllers/UsersController');

module.exports = (app) => {
  app.route('/users')
  .post(usersController.create_user)
  .get(usersController.fetch_users)


  app.route('/users/:userId')
    .get(usersController.fetch_a_user)
    .put(usersController.update_user) //pour mettre à jour une session ou son mot de passe, adresse mail, etc.

  app.delete("/users/:userId",usersController.delete_user)

  app.route('/login')
  .post(usersController.login_user);
}
