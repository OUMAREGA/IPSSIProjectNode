const userFactory = require("../factory/UserFactory");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt") //methode de hash pour crypter le mot de passe
const robustesse = 10 //plus la valeur élevée plus la méthode de hachage sera lourde pour le mot de passe

//créer un utilisateur
exports.create_user = (req, res) => {
    let errors = [] //pour récupérer les erreurs envoyées depuis la base (définis dans le schéma : required, validate...)

    bcrypt.hash(req.body.password, robustesse, (err, hash) => {
        req.body.password = hash
        const make_user = userFactory.create(req.body.roleId, req) //l'utilisateur est généré depuis la factory
        if (!make_user) //si la factory a renvoyé null
            res.status(400).json({ erreur: "Type d'utilisateur invalide" })
        else {
            make_user.validate().then(() => make_user.save((error, user) => { //sinon on procède d'abord à la validation des données
                if (!error || user) //à ce stade on peut sauvegarder / tester la sauvegarde
                    res.status(201).json(user);
                else{
                    if(error.errors)
                    {
                        Object.values(error.errors).forEach((e) => { //on récupère les erreurs par attribut erroné
                            errors[e.path] = e.message
                        })
                        res.status(400).json(Object.assign({}, errors)) //Après conversion, et on les affiche dans un objet JSON
                    }else
                     res.status(500).json({ message: "Erreur serveur" })
                }
            }))
                .catch((err) => { //si la sauvegarde échoue...

                    Object.values(err.errors).forEach((e) => { //on récupère les erreurs par attribut erroné
                        errors[e.path] = e.message
                    })
                    res.status(400).json(Object.assign({}, errors)) //Après conversion, et on les affiche dans un objet JSON
                })
        }

    })
}

//Authentifier un utilisateur
exports.login_user = (req, res) => {
    let { body } = req; //syntaxe ES6

        userFactory.findOneGen({ email: body.email }).then((user, error) =>{

            if (user) {
                // si l'utilisateur existe, on passe vérifie d'abord son mot de passe
                bcrypt.compare(body.password, user.password, (err, resultat) => {
                    if (!resultat || err) //si la vérification échoue ou qu'il n'a pas saisi le mot de passe
                    {
                        res.status(422).json({ message: "Mot de passe invalide" })
                        /**
                         * On renvoie une erreur 422 (unprocessable entity) car:
                         * la requête de l'utilisateur est correcte (sinon erreur 400)
                         * Et il n'a accédé à aucune ressource sans autorisation (sinon erreur 401)
                         * et sans problème de droits (sinon erreur 403)
                         */
                    } else { //si le mot de passe est valide on peut passer par JWT
                        jwt.sign({ name: user.name, firstname: user.firstname, email: user.email, roleId: user.roleId }, process.env.JWT_KEY, { expiresIn: "30m" }, (jwtError, token) => {
                            if (jwtError) {
                                console.log(jwtError);
                                res.status(500);
                                res.json({ message: "Erreur serveur" });
                            } else { //si tout passe on peut renvoyer un token
                                res.status(200);
                                res.json({ token });
                            }
                        })
                    }
                })

            } else {
                // si l'utilisateur n'existe pas, on renvoit une erreur 404 
                res.status(404);
                res.json({ message: "Utilisateur introuvable" })
            }

        }).catch(() => res.status(500).json({ message: "Erreur serveur" }))
}

exports.fetch_a_user = (req,res) => {

    userFactory.findOneGen({ _id: req.params.userId }).then((user,error)=>{
        if(user)
            res.json(user)
        else{
            res.status(404).json({message: "Utilisateur introuvable"})
        }
    }).catch((err) => res.status(500).json({ message: "Erreur serveur"}))
}

/**
 * Chercher des utilisateurs
 * Possibilité d'utiliser des query params pour
 * affiner la recherche par le type d'utilisateur
 */
exports.fetch_users = (req, res) => {

    try {
       
        if (req.query.role && ["admin","étudiant","intervenant"].includes(req.query.role)) { //on vérifie qu'une query param existe en URI
                userFactory.find(req.query.role,{}).then((users, error) => {
                    if(users.length != 0)
                        res.status(200).json(users)
                    else
                        res.status(404).json({ message: `Aucun ${req.query.role} disponible` })
                }).catch((err) => res.status(500).json({ message: "Erreur serveur" }))
  
        } else {
            userFactory.findAll({}).then((users, error) => {
                    if (users.length == 0)
                        res.status(404).json({ message: "Aucun utilisateur disponible" })
                    else
                        res.status(200).json(users)
            }).catch((err) => res.status(500).json({ message: "Erreur serveur" }))
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "Erreur serveur" })
    }
}


exports.update_user = (req, res) => {

    let errors = []
    try {
                //pour l'étudiant
        if (req.body.sessionId) //si on a passé une session, on doit vérifier son existance (les middlewares de mongoose ne fonctionnent pas)
        {
            const Session = require("../models/sessionModel")

            Session.findById(req.body.sessionId, (error, session) => {
                if (!error || session) {
                        userFactory.update("étudiant",{ _id: req.params.userId },req.body)
                        .then((data) => res.status(200).json(data))
                        .catch((err) => {
                            if(err.errors){
                                Object.values(err.errors).forEach((e) => { //on récupère les erreurs par attribut erroné
                                    errors[e.path] = e.message
                                })
                                res.status(400).json(Object.assign({}, errors)) //Après conversion, et on les affiche dans un objet JSON            
                            }else{
                                res.status(404).json({ message: "Étudiant introuvable" })
                            }
                        })
     
                }
            }).catch((err) => res.status(404).json({ message: "Session introuvable"} ))
        } else if(req.body.password) { //si on veut mettre à jour le mot de passe
            bcrypt.hash(req.body.password, robustesse).then((hash) => {
                console.log(hash)
                req.body.password = hash;
                userFactory.update({_id: req.params.userId },req.body).then((up)=>{
                    res.status(200).json(up)
                }).catch((err) => {
                    if(err.errors){
                        Object.values(err.errors).forEach((e) => { //on récupère les erreurs par attribut erroné
                            errors[e.path] = e.message
                        })
                        res.status(400).json(Object.assign({}, errors)) //Après conversion, et on les affiche dans un objet JSON            
                    }else{
                        res.status(400).json({ message: "Utilisateur introuvable" })
                    }
                })
            }).catch((err) => res.status(500).json({ message: "Erreur serveur "}))
        }else{
            userFactory.update({_id: req.params.userId },req.body).then((up)=>{
                res.status(200).json(up)
            }).catch((err) => {
                if(err.errors){
                    Object.values(err.errors).forEach((e) => { //on récupère les erreurs par attribut erroné
                        errors[e.path] = e.message
                    })
                    res.status(400).json(Object.assign({}, errors)) //Après conversion, et on les affiche dans un objet JSON            
                }else{
                    res.status(400).json({ message: "Utilisateur introuvable" })
                }
            })
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "Erreur serveur" })
    }
}

exports.delete_user = (req,res) => {

    try{
        userFactory.delete({ _id: req.params.userId }).then((user) => {
            if(!user)
                res.status(400).json({ message: "Utilisateur introuvable"})
            else{
                res.status(200).json({ message: "Utilisateur supprimé"})
            }
        })
    }catch(e){
        res.status(500).json({ message: "Erreur serveur" })
    }
}
