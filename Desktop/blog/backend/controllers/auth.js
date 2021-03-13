const {response} = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt"); 
const { generateJwt } = require("../helpers/generateJwt");
const Post = require("../models/Post");

const login = async (req, res=response) => {

    try {
        const {email, password} = req.body; 

        const user = await User.findOne({email}); 

        if(!user){
            return res.status(400).json({
                success:false,
                message: "User doesnt exist"
            }); 
        }

        //password
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if(!passwordIsValid){
            return res.status(400).json({
                success:false,
                message: "Wrong Password"
            }); 
        }

        //token
        const token =  await generateJwt(user.id, user.name); 

        res.json({
            success:true, 
            uid: user.id, 
            name: user.name, 
            token
        })
    } catch (error) {
        console.log(error); 

        res.status(500).json({
            success:false, 
            message: "There is a problem, contact admin"
        })
    }

    res.json({
        ok:true, 
        message: "login"
    })
}

const register = async (req,res=response)=>{

    const {email, password} = req.body; 

    try {

        let user = await User.findOne({email}); 

        if(user){
            return res.status(400).json({
                success: false,
                message: "User Already Exist"
            });
        }


        user = new User(req.body); 

        //password
        const salt = bcrypt.genSaltSync(); 
        user.password = bcrypt.hashSync(password, salt);

        await user.save(); 

        //token
        const token = await generateJwt(user.id, user.name); 
    
        res.status(201).json({
            success:true,
            message: "User Registered", 
            uid: user.id, 
            name: user.name, 
            token
        }) 
    } catch (error) {
        console.log(error); 

        res.status(500).json({
            success:false,
            message: "There is a problem, contact admin"
        }); 
    }


}

const renewToken = async (req,res) => {

    const { uid, name} = req;

    //gen token
    const token = await generateJwt(uid, name); 

    res.json({
        success:true,
        token,
        name,
        uid
    })
}

const userDetails = async (req,res=response) => {
    const {uid, name} = req; 

    try {
        const user = await User.findOne({"_id": uid}).select("-password"); 

        if(user){
            res.json({
                success:true,
                user: user
            })
        }else{
            res.json({
                success:false,
                message: "There it was an error"
            })
        }


    } catch (error) {
        res.json({
            success:false,
            message: error
        })
    }

}

const userPosts = async (req,res=response) => {
    const {uid, name} = req; 

    try {
        const posts = await Post.find({"user" : uid }).populate("user", "name"); 
        res.json({
            posts
        })
    } catch (error) {
        console.log(error); 
    }

}

const updateUser = async(req,res=response) => {

    try {
        const user = await User.findById(req.uid);

        if(user){
            user.name = req.body.name || user.name; 
            user.email = req.body.email || user.email; 
        }

        if(req.body.password){
            const salt = bcrypt.genSaltSync(); 
            user.password = bcrypt.hashSync(req.body.password, salt);
        }

        const updatedUser = await user.save(); 

        //gen token
        const token = await generateJwt(updatedUser.id, updatedUser.name); 

        res.json({
            success:true,
            token,
            uid: updatedUser.id,
            name: updatedUser.name, 
            email:updatedUser.email

        })

        res.json({
            updatedUser
        })
    } catch (error) {
        
    }
}

module.exports = {
    login, 
    register, 
    renewToken, 
    userDetails, 
    userPosts, 
    updateUser
}