const Note = require('../models/notesModel')
const Module = require("../models/modulesModel")

// exporter les methodes de NotesController.js
exports.note_create = (req, res) => {

    let errors = []

    try {
        // recupérer dans le body le moduleId (va être utilisé par validate())
        const new_note = new Note(req.body);
        new_note.validate().then(() => new_note.save((error, note) => {
            if(error){ //si les validations passent, il ne reste plus que la sauvegarde : on doit passer par les index
                console.log(error)
                if(error.code === 11000) //si on a un problème d'unicité
                res.status(400).json({ message: "Vous avez déjà noté ce module" })
            }
            else
                res.status(201).json(note);
        })).catch((err) => {
            Object.values(err.errors).forEach((e) => {
                errors[e.path] = e.message
            })
            res.status(400).json(Object.assign({}, errors))
        })

    }  catch (e) {
        // Affichage de l'erreur du serveur dans le terminal
        console.log(e)
        res.status(500).json({
            message: "Erreur serveur"
        })
    }


}

exports.fetch_notes = (req, res) => {

    Note.find({}, (error, notes) => {
        if (error)
            res.status(404).json({
                message: "Aucune note disponible"
            })
        else
            res.status(200).json(notes)
    }).catch((err) => res.status(500).json({
        message: "Erreur serveur"
    }))
}

exports.fetch_notes_module = (req, res) => {
    Module.findById(req.params.moduleId, (error, _module) => {
        if (!_module)
            res.status(404).json({
                message: "Module introuvable"
            })
        else {
            Note.find({}, (error, modules) => {
                if (error) {
                    res.status(404)
                    res.json({
                        message: "Aucune note existante pour ce module"
                    })
                } else {
                    res.status(200)
                    res.json(modules)
                }
            })
        }
    }).catch((err) => res.status(400).json(e));
}
