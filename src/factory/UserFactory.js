const userModel = require("../models/userModel");
/**
 * Étant donné que le discriminatorKey n'est qu'informatif
 * On va passer par de la logique afin de retourner le bon
 * type d'utilisateur qu'on va créer (pattern factory)
 * @param {String} type le type d'utilisateur qu'on souhaite
 * @param {Object} data les paramètres envoyés par l'utilisateur (body)
 */
const createUser = (type, data) => {

    let new_user = null;

    switch (type) {
        case "admin" || "intervenant":
            new_user = userModel.Generic(data.body)
            break;

        case "étudiant": //variable différente pour l'étudiant
            new_user = userModel.Student(data.body)
            break;
    }

    return new_user;
};

//pour juste récupérer une instance de schéma
/**
 * 
 * @param {string} type 
 */
const instanceUser = (type) => {
    
    switch(type) {

        case "étudiant":
            return userModel.Student;
        default:
            return userModel.Generic;
        
    }
};

module.exports.create = createUser;
module.exports.instance = instanceUser;