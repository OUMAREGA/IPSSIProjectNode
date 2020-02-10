var mongoose = require('mongoose');
// make a connection
mongoose.connect('mongodb://mongo/insight_BDD', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true)
const data = require("../data/users.json")
const color = require("cli-color")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
    //on remplace les mots de passe en clair par des chiffrés (nécessaire pour la connexion, car on vérifie les hash)
for (key of Object.keys(data)) {
    for (user of data[key])
        user.password = bcrypt.hashSync(user.password, 10)
}

//On insert les utilisateurs (chaque type à la suite, car la structure des modèles / schémas peut différer)
//on commence par les administrateurs
User.insertMany(data.admins).then((docs) => {
        console.log(color.green(`${docs.length > 1 ? color.bold(docs.length) + ' administrateurs importés' : 'Un seul administrateur importé'}`));
    }) //Puis par les intervenants
    .then(() => User.insertMany(data.intervenants)
        .then((docs) => {
            console.log(color.green(`${docs.length > 1 ? color.bold(docs.length) + ' intervenants importés' : 'Un seul intervenant importé'}`));
        })
        .then(() => User.Student.insertMany(data.etudiants) //l'étudiant a une structure différente, on invoque User.student
            .then((docs) => {
                console.log(color.green(`${docs.length > 1 ? color.bold(docs.length) + ' étudiants importés' : 'Un seul étudiant importé'}`))
                process.exit()
            }))
        .catch((err) => { //s'il y a des erreurs de validation
            let errors = []
            if (err.errors) {

                Object.values(err.errors).forEach((e) => { //on récupère les erreurs par attribut erroné
                    errors[e.path] = e.message
                    console.log(color.mangenta("Problème pour : " + e.value))
                    console.log(color.red(color.bold(e.path) + ": " + e.message))
                })
            } else {
                console.log(color.red(err))
            }
            process.exit()
        })).catch((err) => {
        console.log(color.red(err.errmsg)) //s'il y a d'autres erreurs (unicité)
        process.exit() //on met fin au processus pour terminer la promesse (éviter un blocage asynchrone)
    })