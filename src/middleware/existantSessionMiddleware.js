const Session = require("../models/sessionSchema")

/**
 * Ce middleware va nous permettre de vérifier
 * si la session associée pour le nouvel étudiant
 * existe bien, avant de passer dans la création du nouvel étudiant
 */

module.exports = (req,res,next) => {
    if(req.body.roleId == "étudiant") {
        Session.findById(req.body.sessionId,(error,session)=>{
            if(error || !session)
                res.status(404).json({ message: "Session introuvable"})
            else{
                res.locals.sessionId = session._id; //si l'existe bien, on va stocker l'id temporairement
                next();
            }
        })
    }else{
        next();
    }
}