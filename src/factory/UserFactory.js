/**
 * Factory + méthodes utilitaires extensibles pour la gestion de nouveaux
 * types d'utilisateur
 */
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

        case "étudiant": //variable différente pour l'étudiant : il est obligatoire de donner une session au nouvel étudiant
            new_user = userModel.Student(data.body)
            break;
        case "intervenant":
            new_user = userModel(data.body)
            break;
        case "admin":
	    new_user = userModel(data.body)
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
            return userModel; //generic
        
    }
};


module.exports.create = createUser;

/**
 * Méthodes utilitaires pour manipuler
 * plus rapidement les différents types d'utilisateurs
 */

 /**
  * Récupérer tous les utilisateurs (peu importe leur type / roleId)
  */
module.exports.findAll = (params) =>
    instanceUser(null).find(params)

/**
 * Récupérer des utilisateurs d'un type particulier
 */
module.exports.find = (type,conditions) =>
    instanceUser(type).find(Object.assign({ roleId: type }),conditions)

/**
 * Récupérer un utilisateur lambda
 */
module.exports.findOneGen = (conditions) => 
    instanceUser(null).findOne(conditions)

/**
 * Récupérer un utilisateur particulier
 */
module.exports.findOne = (type,conditions) => 
    instanceUser(type).findOne(Object.assign({ roleId: type }))

/**
 *  Mettre à jour un utilisateur particulier 
 */    
module.exports.update = (type,conditions,data) => 
    instanceUser(type).findOneAndUpdate(Object.assign({ roleId: type },conditions),data,{ new: true })


/**
 * Mettre à jour un utilisateur lambda
 */
module.exports.update = (conditions,data) => 
    instanceUser().findOneAndUpdate(conditions,data,{ new: true })


/**
 * Supprimer un utilisateur
 */
module.exports.delete = (conditions,callback) =>
    instanceUser().findOneAndRemove(conditions)

// module.exports.delete = (type,conditions,callback) =>
//     instanceUser(type).findOneAndRemove(Object.assign({ roleId: type }, conditions)).then(callback)

module.exports.instanceUser = instanceUser;
