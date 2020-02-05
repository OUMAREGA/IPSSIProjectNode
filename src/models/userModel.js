const mongoose = require("mongoose")
const Schema = mongoose.Schema

const options = { discriminatorKey: "roleKey" } //création d'un discriminant : identification de différenciation entre schémas
                    //la renommer en roleId peut avoir des effets indésirables vu que roleId est le nom d'un attribut de schéma (userSchema)

/**
 * Utilisateur classique
 */
const userSchema = new Schema({

    name:{
        type: String,
        required: "Le nom de l'utilisateur est requis"
    },
    firstname:{
        type: String,
        required: "Le prénom de l'utilisateur est requis"
    },
    password:{ //devra être hashé en controller
        type: String,
        required: "Le mot de passe est requis"
    },
    email:{
        type: String,
        required: "L'adresse mail de l'utilisateur est requise",
        validate:{ //validation du mail (invoquer validate())
            validator: (value) => {
		if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
			return Promise.resolve(true)
		else
			return Promise.resolve(false)
	    },
            message: "Email non conforme"
        }
    },
    roleId:{
        type: String,
        required: "Le rôle du nouvel utilisateur est requis",
        //suppression de l'enum : la vérification sera effectuée dans la factory
    }

},options);

const UserGeneric = mongoose.model("User",userSchema);
/**
 * On applique le discriminator (c'est une sorte d'héritage)
 * Ça nous évite de réécrire le même schéma avec seulement un attribut supplémentaire
 * 
 * La valeur du discriminant n'est qu'informative (il s'agit juste d'un autre type)
 * Si l'utilisateur crée un nouvel objet User avec étudiant, cela ne fonctionnera pas
 * 
 */

 /**
  * Création d'un utilisateur étudiant (hérite des propriétés d'un utilisateur classique)
  */
const UserStudent = UserGeneric.discriminator("StudentExtension", new mongoose.Schema({ 
    sessionId: {
        type: String,
        required: "Une session doit être attribuée à l'étudiant"
    }
 }));

 module.exports.User = UserGeneric;
 module.exports.Student = UserStudent;

 /**
  * Si on fournit un sessionID à un nouvel utilisateur, CELA N'AURA AUCUN EFFET
  */
