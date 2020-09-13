const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function (req, res, next) {
    let token = req.headers["authorization"];

    if (!token) {
        res.status(403).json({
            success: false,
            message: 'No token provided'
        })

        return;
    }


    jwt.verify(token, config.secret, (err, decoded) => {


        if (err) {
            res.json({
                success: false,
                message: 'Failed to authenticate token'
            });
            return;
        }

        req.decoded = decoded;
        next();

    })

}