// src/api/controllers/userController.js
const mongoose = require('mongoose'); //Inclusion de l'odm
const Session = require('../models/sessionModel'); //Inclusion du modèle 
let errors = [] //pour récupérer les erreurs envoyées depuis la base (définis dans le schéma : required, validate...)

//Créer une session
exports.session_register = (req, res) => {
  let new_session = new Session(req.body);

  try{
    new_session.save((error, session) => {
        if(error){
          Object.values(error.errors).forEach((e) => { //on ne récupère que les attributs erronées avec leur message d'erreur
          errors[e.path] = e.message;
        })

        res.status(400);
        res.json(Object.assign({},errors)); //conversion du tableau d'erreur en object js (plus facile à manipuler)
      }
      else{
        res.status(201);
        session = session.toObject();
        res.json(session);
      }
    })
  }
  catch(e){
    res.status(500);
    res.json({message: "Erreur serveur."});
  }
}

//Récuperer les sessions
exports.list_all_sessions = (req, res) => {
    Session.find({}, (error, sessions) => {
      if(error){
        Object.values(error.errors).forEach((e) => { //manipulation identique sauf qu'on rajoute ici le message d'échec de validation
          errors[e.path] = e.message;
        })
        res.status(400);
        res.json(Object.assign({},errors));
      }
      else if(!sessions){
        res.status(404);
        console.log(error);
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
        if(session == null){
          res.status(404);
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
        if(session == null){
          res.status(404);
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
        if(session == null){
          Object.values(error.errors).forEach((e) => { //manipulation identique sauf qu'on rajoute ici le message d'échec de validation
            errors[e.path] = e.message;
          })
          res.status(400);
          res.json(Object.assign({},errors));
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
