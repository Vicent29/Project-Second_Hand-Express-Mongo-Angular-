var { expressjwt: jwt } = require('express-jwt');
var secret = require('../config').secret;

function getTokenFromHeader(req) {
    console.log("hola");
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
        req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            console.log(req.headers.authorization.split(' ')[1]);
        return req.headers.authorization.split(' ')[1];
    }

    return null;
}

var auth = {
    required: jwt({
        secret: secret,
        algorithms: ["HS256"],
        userProperty: 'payload',
        getToken: getTokenFromHeader
    }),
    // optional: jwt({
    //     secret: secret,
    //     algorithms: ["HS256"],
    //     userProperty: 'payload',
    //     credentialsRequired: false,
    //     getToken: getTokenFromHeader
    // })
};

module.exports = auth;