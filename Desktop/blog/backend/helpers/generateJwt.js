const jwt = require("jsonwebtoken"); 

const generateJwt = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = {uid, name}; 

        jwt.sign(payload, process.env.SECRET_WORD, {
            expiresIn: "3h"
        }, (error, token) => {
            if(error){
                console.log(error); 
                reject("Token was not generated")
            }
            
            resolve(token); 
        });
    }); 
}

module.exports = {
    generateJwt
}