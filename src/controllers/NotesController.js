const Notes = require('../models/notes_schema')
const Module = require("../models/modulesSchema")

        // exporter les methodes de NotesController.js
exports.note_create = (req, res) => {

    try {
        // recupérer dans le body le moduleId
        Module.findById(req.body.moduleId, (error, _module) => {
            if (error)
                res.status(400).json({ message: "Module introuvable" })
            else {
        // Instance d'une note
                let new_note = new Notes(req.body);
        // Sauvegarde d'une note sous certaines conditions
                new_note.save((error, note) => {
                    if (error) {
                        res.status(400);
                        res.json({ message: "Il manque des informations" });
                    }
                    else {
                        res.status(201);
                        res.json(note);
                    }
                })

            }
        })
    } catch (e) {
        // Affichage de l'erreur du serveur dans le terminal
        console.log(e)
        res.status(500).json({ message: "Erreur serveur." })
    }


}

