// src/api/controllers/userController.js
const mongoose = require('mongoose'); //Inclusion de l'odm
const Session = require('../models/sessionModel'); //Inclusion du modèle 

//Créer une session
exports.session_register = (req, res) => {
  let new_session = new Session(req.body);

  try{
    new_session.save((error, session) => {
      if(error){
        res.status(400);
        res.json({message: "Il manque des infos"});
      }
      else{
        res.status(201);
        session = session.toObject();
        res.json(session)
      }
    })
  }
  catch(e){
    res.status(500);
    res.json({message: "Erreur serveur."});
  }
}

//Récuper les sessions
exports.list_all_sessions = (req, res) => {
    Session.find({}, (error, sessions) => {
      if(error){
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."})
      }
      else{
        res.status(200);
        res.json(sessions);
      }
    })
}

//Récuperer une session
exports.get_a_session = (req, res) => {
    try {
      Session.findById(req.params.session_id, (error, session) => {
        if(error){
          res.status(400);
          console.log(error);
          res.json({message: "Id introuvable"});
        }
        else{
          res.status(200);
          res.json(session)
        }
      })
    } catch (e) {
      res.status(500);
      console.log(e);
      res.json({message: "Erreur serveur"})
    }
}

//Mettre à jour une session
exports.update_a_session = (req, res) => {
    try {
      Session.findByIdAndUpdate(req.params.session_id, req.body, {new:true}, (error, session) => {
        if(error){
          res.status(400);
          console.log(error);
          res.json({message: "Id introuvable"});
        }
        else{
          res.status(200);
          res.json(session)
        }
      })
    } catch (e) {
      res.status(500);
      console.log(e);
      res.json({message: "Erreur serveur"})
    }
  }
  
//Supprimer une session
exports.delete_a_session = (req, res) => {
    try {
      Session.findByIdAndRemove(req.params.session_id, (error) => {
        if(error){
          res.status(400);
          console.log(error);
          res.json({message: "Id introuvable"});
        }
        else{
          res.status(200);
          res.json({message: "Session supprimé"})
        }
      })
    } catch (e) {
      res.status(500);
      console.log(e);
      res.json({message: "Erreur serveur"})
    }
  }