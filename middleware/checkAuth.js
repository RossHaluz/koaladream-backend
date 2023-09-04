const jwt = require('jsonwebtoken');
const { HttpError } = require("../healpers");

const {SECRET_KEY} = process.env;

const checkAuth = (req, res, next) => {
    const authHedear = req.headers.authorization;
    if(!authHedear){
        next(HttpError(401, 'Not authorization'))
    }
    const [bearer, token] = authHedear.split(" ", 2);
    if(bearer !== 'Bearer'){
        next(HttpError(401, 'Not authorization'))
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if(err){
            next(HttpError(401, 'Not authorization'))
        }
        req.userId = decoded;

        next()
    })
}

module.exports = {
    checkAuth
}