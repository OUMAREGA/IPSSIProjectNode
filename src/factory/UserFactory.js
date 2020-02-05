const userSchema = require("../models/userSchema");
/**
 * Étant donné que le discriminatorKey n'est qu'informatif
 * On va passer par de la logique afin de retourner le bon
 * type d'utilisateur qu'on va créer (pattern factory)
 * @param {String} type le type d'utilisateur qu'on souhaite
 * @param {Object} data les paramètres envoyés par l'utilisateur (body)
 * @param {Object} res Objet de la réponse (contient déjà du contenu si passé par middleware)
 */
const createUser = (type, data, res) => {

    switch (type) {
        case "admin":
            return Promise.resolve(userSchema.User(data.body));

        case "intervenant":
            return Promise.resolve(userSchema.User(data.body));

        case "étudiant": //étape supplémentaire pour l'étudiant
            data.body.sessionId = res.locals.sessionId; //sessionId est la valeur retournée par notre middleware
            return Promise.resolve(userSchema.User(data.body));

        default:
            return Promise.reject({error: "Type d'utilisateur non existant"});
    }

};

module.exports = createUser;