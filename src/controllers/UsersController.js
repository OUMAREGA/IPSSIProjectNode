const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.create_user = (req, res) => {
    let new_user = new User(req.body)
    try {
        // Avant de sauvegarder l'utilisateur, on va vérifier si l'adresse mail est conforme
        new_user.validate().save((error, user) => {
            if (error) {
                res.status(400)
                res.json({ message: "Il manque des informations" })
            }
            else {
                res.status(201)
                res.json(user)
            }
        })
    } catch (e) {
        res.status(500)
        res.json({ message: "Erreur serveur." })
    }

}

exports.login_user = (req, res) => {
    let body = req.body
    try {
        User.findOne({ email: body.email }, (error, user) => {
            if (user) {
            // si l'utilisateur existe, on passe par JWT pour générer un token 
                jwt.sign({ email: user.email }, process.env.JWT_KEY, { expiresIn: "30m" }, (jwtError, token) => {
                    if (jwtError) {
                        console.log(jwtError);
                        res.status(500);
                        res.json({ message: "Erreur serveur" });
                    }
                    else {
                        res.status(200);
                        res.json({ token });
                    }
                })
            } else {
            // si l'utilisateur n'existe pas, on renvoit une erreur 404 
                res.status(404);
                res.json({message: "Utilisateur introuvable"})
            }

        })

    } catch (e) {
        res.status(500)
        res.json({ message: "Erreur serveur." })
    }
}

