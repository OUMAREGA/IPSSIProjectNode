const usersController = require('../controllers/UsersController');
const middleware = require("../middleware/jwtMiddleware")
module.exports = (app) => {
  app.route('/users')
  .post([middleware.verify_token,middleware.is_admin],usersController.create_user)
  .get([middleware.verify_token,middleware.is_admin],usersController.fetch_users)


  app.route('/users/:userId')
    .get([middleware.verify_token,middleware.is_admin],usersController.fetch_a_user)
    .put([middleware.verify_token,middleware.is_admin],usersController.update_user) //pour mettre à jour une session ou son mot de passe, adresse mail, etc.

  app.delete([middleware.verify_token,middleware.is_admin],"/users/:userId",usersController.delete_user)

  app.route('/login')
  .post(usersController.login_user);
}
