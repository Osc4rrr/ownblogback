const {response} = require("express"); 
const jwt = require("jsonwebtoken");

const validateJwt = (req,res=response, next) => {

    //x-token
    const token = req.header("x-token"); 

    if(!token){
        return res.status(401).json({
            success:false,
            message: "There is no token"
        });
    }

    try {
        const {uid,name} = jwt.verify(
            token,
            process.env.SECRET_WORD
        ); 

        req.uid = uid; 
        req.name=name;

        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message: "Token Invalid"
        }); 
    }

    next();

}

module.exports = {
    validateJwt
}