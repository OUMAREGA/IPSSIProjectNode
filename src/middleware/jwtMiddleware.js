const jwt = require('jsonwebtoken');

exports.verify_token = (req, res, next) => {
    let token = req.headers['authorization']; // get token
    // if token
    if (token) {
        // verify token
        jwt.verify(token, process.env.JWT_KEY, (error, result) => {
            console.log(result)
            if (error) {
                res.status(403);
                res.json({ message: "Accès refusé" })
            } else {
                res.locals.user = result
                    /**
                     * //utilisation de res.locals pour créer une variable 
                     * de portée de la requête en cours, et non à toute l'application (app.locals)
                     * efficace pour masquer des informations sensibles  
                     */
                next(); // next method
            }
        })
    } else {
        res.status(401);
        res.json({ message: "Vous n'êtes pas authentifié" })
    }
}

exports.is_admin = (req, res, next) => {
    const { user } = res.locals;
    if (user.roleId === "admin")
        next();
    else {
        res.status(403).json({ message: "Accès refusé : vous n'êtes pas autorisé à consulter cette ressource" })
    }
}

exports.is_student = (req, res, next) => {
    const { user } = res.locals;
    if (user.roleId === "étudiant")
        next();
    else {
        res.status(403).json({ message: "Accès refusé : vous n'êtes pas étudiant" })
    }
}

exports.is_teacher = (req, res, next) => {
    const { user } = res.locals;
    if (user.roleId === "étudiant")
        next();
    else {
        res.status(403).json({ message: "Accès refusé : vous n'êtes pas un intervenant" })
    }
}