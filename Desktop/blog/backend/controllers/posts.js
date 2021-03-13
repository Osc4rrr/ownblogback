const {response} = require("express"); 
const Post = require("../models/Post"); 

const getPosts = async(req,res=response) => {
    const posts = await Post.find().populate("user", "name");

    res.json({
        success:true,
        posts
    })
}

const getPost = async(req,res=response) => {
    try {
        const post = await Post.findById(req.params.id).populate("user", "name"); 
        res.json({
            success:true, 
            post
        })
    } catch (error) {   
        console.log(error); 
        res.json({
            success:false,
            message:"Post was not found"
        })
    }
}

const createPost = async(req,res=response) => {
    
    try {
        const post = new Post(req.body); 
        post.user = req.uid; 

        const savedPost = await post.save(); 

        res.status(201).json({
            success:true, 
            post: savedPost
        })
    } catch (error) {
        console.log(error); 
        res.status(500).json({
            success:false,
            message: "Error, contact admin"
        })
    }
}

const updatePost = async (req,res=response) => {

    const postId = req.params.id; 
    const uid = req.uid; 
    try {

        const post = await Post.findById(postId); 

        if(!post){
            res.status(400).json({
                success:false, 
                message: "Post was not found with this id"
            }); 
        }

        if(post.user.toString() !== uid){
            return res.status(401).json({
                success:false,
                message:"No privileges"
            })
        }

        const newPost = {
            ...req.body, 
            user:uid
        }

        const postUpdated = await Post.findByIdAndUpdate(postId, newPost, {new:true})
        res.json({
            success:true,
            post: postUpdated
        })
    } catch (error) {
        console.log(error); 
        res.status(500).json({
            ok:false,
            msg: 'Contact admin'
        });
    }
}

const deletePost = async (req,res=response) => {
    const postId = req.params.id; 
    const uid = req.uid; 

    try {
        const post = await Post.findById(postId); 

        if(!post){
            res.status(404).json({
                success:false,
                message:"dont exist"
            })
        }

        if(post.user.toString() !==  uid) {
            return res.status(401).json({
                success:false,
                message:"No privileges"
            }); 
        }

        await Post.findByIdAndDelete(postId); 

        res.json({
            success:true, 
            message:"Post was deleted"
        })
    } catch (error) {
        console.log(error); 
        res.status(500).json({
            success:false, 
            message: 'Contact admin'
        }); 
    }
}

module.exports = {
    getPosts, 
    createPost, 
    getPost, 
    updatePost, 
    deletePost
}