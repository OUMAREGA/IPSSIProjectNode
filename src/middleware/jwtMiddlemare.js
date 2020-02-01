const jwt = require('jsonwebtoken');

exports.verify_token = (req, res, next) => {
    let token = req.headers['authorization']; // get token
    // if token
    if (token) {
        // verify token
        jwt.verify(token, process.env.JWT_KEY, (error, result) => {
            if (error) {
                res.status(403);
                res.json({ message: "Accès refusé" })
            }
            else {
                next(); // next method
            }
        })
    }
    else {
        res.status(403);
        res.json({ message: "Accès refusé" })
    }
}