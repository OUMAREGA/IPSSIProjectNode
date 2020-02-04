const mongoose = require('mongoose');
const Module = require('../models/modulesModel');
const User = require('../models/userModel');
const Session = require('../models/sessionModel');

/**
 * GET
 * list all modules
 */
exports.listModules = (req, res) => {
    try {

        Module.find({}, (error, modules) => {

            res.status(200);
            res.json(modules);

        })
    } catch (error) {
        res.status(500);
        res.json({ message: "Erreur serveur" })
    }

}

/** 
* POST
* create a module
* test if user exists and is a teacher, then adds to new module
* test if session exists
*/
exports.createModule = (req, res) => {

    User.findById(req.body.teacherID).then((error,user) => {
        if (user.role_id === 'intervenant') {

            newModule = new Module(req.body);

            if (req.body.sessionId) {
                Session.findById(req.body.sessionId).then((error,user) => {
                    newModule.sessionId = req.body.sessionId
                }).catch(() => res.json("La session n'existe pas"))
            }

            try {
                newModule.save((error, module) => {
                    if (error) {
                        res.status(400);
                        console.log(error);
                        res.json({ message: "Il manque des infos" });
                    }
                    else {
                        res.status(201);
                        res.json(module)
                    }
                })
            } catch (e) {
                res.status(500);
                res.json({ message: "Erreur serveur" })
            }
        }
        else {
            res.json("Veuilez selectionner un formateur");
        }
    }).catch(() => res.json("L'utilisateur n'existe pas"))

}

/**
 * GET
 * one module
 */
exports.getModule = (req, res) => {
    try {
        Module.findById(req.params.moduleId, (error, module) => {
            if (error) {
                res.status(400);
                console.log(error);
                res.json({ message: "Id introuvable" });
            }
            else {
                res.status(200);
                res.json(module);
            }
        })
    } catch (error) {
        res.status(500);
        res.json({ message: "Erreur serveur" })
    }

}
/**
 * UPDATE
 * update a module
 * test if user exists and is a teacher then adds to new module
 * test if sesion exists
 */
exports.updateModule = (req, res) => {
    User.findById(req.body.teacherID).then((error,user) => {
        if (user.role_id === 'intervenant') {

            newModule = new Module(req.body);

            if (req.body.sessionId) {
                Session.findById(req.body.sessionId).then((error,user) => {
                    newModule.sessionId = req.body.sessionId
                }).catch(() => res.json("La session n'existe pas"))
            }

            try {
                Module.findByIdAndUpdate(req.params.moduleId, req.body, { new: true }, (error, module) => {
                    if (error) {
                        res.status(400);
                        console.log(error);
                        res.json({ message: "Id introuvable" });
                    }
                    else {
                        res.status(200);
                        res.json(module)
                    }
                })
            } catch (e) {
                res.status(500);
                console.log(e);
                res.json({ message: "Erreur serveur" })
            }
        }
        else {
            res.json("Veuilez selectionner un formateur");
        }
    }).catch(() => res.json("L'utilisateur n'existe pas"))

}
/**
 * DELETE
 * delete a module
 */
exports.deleteModule = (req, res) => {
    try {
        Comment.findByIdAndDelete(req.params.moduleId, (error) => {
            if (error) {
                res.status(400);
                console.log(error);
                res.json({ message: "Id introuvable" });
            }
            else {
                res.status(200);
                res.json({ message: "Commentaire supprimé" })
            }
        })
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({ message: "Erreur serveur" })
    }
}

/**
 * GET
 * list modules by Sessions
 */
exports.listModulesBySession = (req, res) => {
    Module.find({ sessionId: req.params.sessionId }, (error, modules) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." });
        }
        else {
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

    User.findById(req.body.teacherID).then((error,user) => {
        if (user.role_id === 'intervenant') {

            newModule = new Module(req.body);

            newModule.sessionId = req.params.sessionId
            
            try {
                newModule.save((error, module) => {
                    if (error) {
                        res.status(400);
                        console.log(error);
                        res.json({ message: "Erreur post" });
                    }
                    else {
                        res.status(201);
                        res.json(module)
                    }
                })
            } catch (e) {
                res.status(500);
                res.json({ message: "Erreur serveur" })
            }
        }
        else {
            res.json("Veuilez selectionner un formateur");
        }
    }).catch(() => res.json("L'utilisateur n'existe pas"))
}

/**
 * GET
 * one module for a session
 */
exports.getModuleBySession = (req, res) => {
    try {
        Module.findOne({ _id: req.params.moduleId, sessionId: req.params.sessionId }, (error, module) => {
            if (error) {
                res.status(400);
                res.json({ message: "Erreur Id : Verifier vos Id" })
            }
            else {
                res.status(200);
                res.json(module);
            }
        })
    } catch (error) {
        res.status(500);
        res.json({ message: "Erreur serveur." })
    }

}
/**
 * UPDATE
 * update a module
 * test if user exists and is a teacher then adds to new module
 * test if sesion exists
 */
exports.updateModuleBySession = (req, res) => {
    User.findById(req.body.teacherID).then((error,user) => {
        if (user.role_id === 'intervenant') {

            newModule = new Module(req.body);

            if (req.body.sessionId) {
                Session.findById(req.body.sessionId).then((error,user) => {
                    newModule.sessionId = req.body.sessionId
                }).catch(() => res.json("La session n'existe pas"))
            }

            try {
                Module.findOneAndUpdate({ _id: req.params.moduleId, sessionId: req.params.sessionId }, req.body, { new: true }, (error, module) => {
                    if (error) {
                        res.status(400);
                        console.log(error);
                        res.json({ message: "Id introuvable" });
                    }
                    else {
                        res.status(200);
                        res.json(module)
                    }
                })
            } catch (e) {
                res.status(500);
                console.log(e);
                res.json({ message: "Erreur serveur" })
            }
        }
        else {
            res.json("Veuilez selectionner un formateur");
        }
    }).catch(() => res.json("L'utilisateur n'existe pas !"))

}
/**
 * Delete
 * one module for a session
 */
exports.deleteModuleBySession = (req, res) => {
    Module.findOneAndDelete({ _id: req.params.moduleId, sessionId: req.params.sessionId }, (error, module) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." })
        }
        else {
            res.status(200);
            res.json(module);
        }
    })
}