const modulesController = require('../controllers/userByTokenController');
const middleware = require("../middleware/jwtMiddleware")
// Exporte la fonction anonyme
module.exports = (app) => {
  app.route('/token')
  .get(modulesController.getUser) // get one user
}