const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt") //methode de hash pour crypter le mot de passe
const robustesse = 10 //plus la valeur élevée plus la méthode de hachage sera lourde pour le mot de passe
exports.create_user = (req, res) => {
    let errors = [] //pour récupérer les erreurs envoyées depuis la base (définis dans le schéma : required, validate...)

	bcrypt.hash(req.body.password, robustesse, (err,hash) => {
		req.body.password = hash
		let new_user = new User(req.body)
		try{
			new_user.validate().then(() => new_user.save((error,user) => {
				if(error){
                    Object.values(error.errors).forEach((e) => { //on ne récupère que les attributs erronées avec leur message d'erreur
                         errors[e.path] = e.message
                    })
					res.status(400)
                    res.json(Object.assign({},errors)) //conversion du tableau d'erreur en object js (plus facile à manipuler)
				}else{
					res.status(201).json(user)
				}
			})).catch((error) => { //passage dans le catch si la validation de l'email échoue
                Object.values(error.errors).forEach((e) => { //manipulation identique sauf qu'on rajoute ici le message d'échec de validation
                     errors[e.path] = e.message
                })
                res.status(400)
                res.json(Object.assign({},errors))
            })
		}catch(e){
			res.status(500)
			res.json({message: "Erreur serveur"})
		}
	})

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
                res.json({message: "Utilisateur introuvable" })
            }

        })

    } catch (e) {
        res.status(500)
        res.json({ message: "Erreur serveur." })
    }
}

