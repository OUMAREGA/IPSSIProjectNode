const userFactory = require("../factory/UserFactory");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt") //methode de hash pour crypter le mot de passe
const robustesse = 10 //plus la valeur élevée plus la méthode de hachage sera lourde pour le mot de passe
exports.create_user = (req, res) => {
    let errors = [] //pour récupérer les erreurs envoyées depuis la base (définis dans le schéma : required, validate...)

	bcrypt.hash(req.body.password, robustesse, (err,hash) => {
		req.body.password = hash
		let make_user = userFactory(req.body.roleId,req,res) //le type d'utilisateur est généré depuis la factory
		try{
        	make_user.then((newUser) => newUser.validate().then(() => newUser.save((error,user) => {
				if(error){
                    Object.values(error.errors).forEach((e) => { //on ne récupère que les attributs erronées avec leur message d'erreur
                         errors[e.path] = e.message
                    })
					res.status(400)
                    res.json(Object.assign({},errors)) //conversion du tableau d'erreur en object js (plus facile à manipuler)
				}else{
					res.status(201).json(user)
				}
			})).catch((error) => { //passage dans le catch si la validation échoue
                Object.values(error.errors).forEach((e) => { //on rajoute ici le message d'échec de validation pour chaque champ (s'il y en a plusieurs)
                     errors[e.path] = e.message
                })
                res.status(400)
                res.json(Object.assign({},errors))
            })).catch((error) => { //passage dans le catch si la promesse de la FACTORY échoue (type d'utilisateur non existant)
                console.log(error)
                res.status(400).json(error)
            })
		}catch(e){
			res.status(500)
			res.json({message: "Erreur serveur"})
		}
	})

}

exports.login_user = (req, res) => {
    let {body} = req; //syntaxe ES6
    try {
        User.findOne({ email: body.email }, (error, user) => {
            
            if (user) {
                // si l'utilisateur existe, on passe vérifie d'abord son mot de passe
                bcrypt.compare(body.password, user.password, (err, resultat) => {
                    if (!resultat || err) //si la vérification échoue ou qu'il n'a pas saisi le mot de passe
                    {
                        res.status(422).json({ message: "mot de passe invalide" })
                        /**
                         * On renvoie une erreur 422 (unprocessable entity) car:
                         * la requête de l'utilisateur est correcte (sinon erreur 400)
                         * Et il n'a accédé à aucune ressource sans autorisation (sinon erreur 401)
                         * et sans problème de droits (sinon erreur 403)
                         */
                    }else { //si le mot de passe est valide on peut passer par JWT
                        jwt.sign({ name: user.name, firstname: user.firstname, email: user.email, roleId: user.roleId }, process.ENV.JWT_KEY, { expiresIn: "30m" }, (jwtError, token) => {
                            if (jwtError) {
                                console.log(jwtError);
                                res.status(500);
                                res.json({ message: "Erreur serveur" });
                            }
                            else { //si tout passe on peut renvoyer un token
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

        })

    } catch (e) {
        res.status(500)
        res.json({message: "erreur serveur"})
    }
}

