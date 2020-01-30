const mongoose = require("mongoose")
const Schema = mongoose.Schema

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
    }

});

module.exports = mongoose.model("User",userSchema)