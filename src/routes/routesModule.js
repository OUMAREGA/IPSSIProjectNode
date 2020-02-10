const modulesController = require('../controllers/modulesController');
const middleware = require("../middleware/jwtMiddleware")
// Exporte la fonction anonyme
module.exports = (app) => {
  app.route('/modules')
  .get([middleware.verify_token,middleware.is_admin],modulesController.listModules) // get all modules
  .post([middleware.verify_token,middleware.is_admin],modulesController.createModule) // create module

  app.route('/modules/:moduleId')
  .get([middleware.verify_token],modulesController.getModule)// get a module
  .put([middleware.verify_token,middleware.is_admin],modulesController.updateModule) // update module
  .delete([middleware.verify_token,middleware.is_admin],modulesController.deleteModule) // delete a module

    
  app.route('/session/:sessionId/modules/:moduleId')
    .get([middleware.verify_token],modulesController.getModuleBySession) // get a module for a session
    .put([middleware.verify_token,middleware.is_admin],modulesController.updateModuleBySession) // update a module for a session
    .delete([middleware.verify_token,middleware.is_admin],modulesController.deleteModuleBySession) // delete a module for a session

  app.route('/session/:sessionId/modules')
    .get([middleware.verify_token],modulesController.listModulesBySession) // get modules for a session
    .post([middleware.verify_token,middleware.is_admin],modulesController.createModuleBySession) // create module for a session

}