const modulesController = require('../controllers/modulesController');

// Exporte la fonction anonyme
module.exports = (app) => {
  app.route('/modules')
  .get(modulesController.listModules) // get all modules
  .post(modulesController.createModule) // create module

  app.route('/modules/:moduleId')
  .get(modulesController.getModule)// get a module
  .put(modulesController.updateModule) // update module
  .delete(modulesController.deleteModule) // delete a module

    
  app.route('/session/:sessionId/modules/:moduleId')
    .get(modulesController.getModuleBySession) // get a module for a session
    .put(modulesController.updateModuleBySession) // update a module for a session
    .delete(modulesController.deleteModuleBySession) // delete a module for a session

  app.route('/session/:sessionId/modules')
    .get(modulesController.listModulesBySession) // get modules for a session
    .post(modulesController.createModuleBySession) // create module for a session

}