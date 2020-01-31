const mongoose = require('mongoose');
const Module = require('../models/modulesModel');

/**
 * GET
 * list all modules
 */
exports.listModules = (req, res) => {
    Module.find({}, (error, modules) => {
      if(error){
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."});
      }
      else{
        res.status(200);
        res.json(modules);
      }
    })
  }
/**
* POST
* create a module
*/
  exports.createModule = (req, res) => {
    newModule = new Module(req.body);
    try {
        newModule.save((error, module) => {
          if(error){
            res.status(400);
            console.log(error);
            res.json({message: "Il manque des infos"});
          }
          else{
            res.status(201);
            res.json(module)
          }
        })
      } catch (e) {
        res.status(500);
        console.log(e);
        res.json({message: "Erreur serveur"})
      }
  }

/**
 * GET
 * one module
 */
exports.getModule = (req, res) => {
    Module.findById(req.params.sessionId, (error, module) => {
      if(error){
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."})
      }
      else{
        res.status(200);
        res.json(module);
      }
    })
  }
  /**
   * UPDATE
   * update a module
   */
exports.updateModule = (req, res) => {
    try {
      Comment.findByIdAndUpdate(req.params.moduleId, req.body, {new:true}, (error, module) => {
        if(error){
          res.status(400);
          console.log(error);
          res.json({message: "Id introuvable"});
        }
        else{
          res.status(200);
          res.json(module)
        }
      })
    } catch (e) {
      res.status(500);
      console.log(e);
      res.json({message: "Erreur serveur"})
    }
  }
  /**
   * DELETE
   * delete a module
   */
  exports.deleteModule = (req, res) => {
    try {
      Comment.findByIdAndRemove(req.params.moduleId, (error) => {
        if(error){
          res.status(400);
          console.log(error);
          res.json({message: "Id introuvable"});
        }
        else{
          res.status(200);
          res.json({message: "Commentaire supprimé"})
        }
      })
    } catch (e) {
      res.status(500);
      console.log(e);
      res.json({message: "Erreur serveur"})
    }
  }

/**
 * GET
 * list modules by Sessions
 */
exports.listModulesBySession = (req, res) => {
  Module.find({sessionId: req.params.sessionId}, (error, modules) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else{
      res.status(200);
      res.json(modules);
    }
  })
}
/**
* POST
* create a module by session
*/
  exports.createModuleBySession = (req, res) => {
    newModule = new Module(req.body);
    newModule.sessionId = req.params.sessionId;
    try {
        newModule.save((error, module) => {
          if(error){
            res.status(400);
            console.log(error);
            res.json({message: "Il manque des infos"});
          }
          else{
            res.status(201);
            res.json(module)
          }
        })
      } catch (e) {
        res.status(500);
        console.log(e);
        res.json({message: "Erreur serveur"})
      }
  }

 