const jwt = require('jsonwebtoken');


/**
 * GET
 * a user
 */
exports.getUser = (req, res) => {
    const usertoken = sessionStorage.getItem('token');
    if(usertoken){
        const decoded = jwt.verify(usertoken, process.env.JWT_KEY);
        res.json(decoded);
    }
    res.json("Token invalide");
    
}