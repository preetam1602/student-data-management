import {Post} from "../models/post.model.js";

const createPost=async(req,res)=>{
    try{
        const {name,usn,age,branch}=req.body;

        if(!name || !usn || !age || !branch){
            return res.status(400).json({message:"All fields are required"});
        }

        const exisitingPost=await Post.findOne({usn:usn});
        if(exisitingPost){
            return res.status(409).json({message:"USN already exists"});
        }

        const newPost=new Post({
            name,
            usn,
            age,
            branch
        });

        await newPost.save();
        return res.status(201).json({message:"Post created successfully"});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        });
    }
}
const getPosts=async(req,res)=>{
    try{
        const posts=await Post.find();
        return res.status(200).json(posts);
    }catch(error){
        console.error(error);
        return res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        });
    }
}
const updatePost=async(req,res)=>{
    try {
        //basic validation to check 
        //{}==truthy value
        if(Object.keys(req.body).length===0){
            return res.status(400).json({
                message:"No data provide for updates"
            });
        }

        const post=await Post.findByIdAndUpdate(req.params.id,req.body,
        {new:true});

        if(!post) return res.status(404).json({
            message:"Post not found"
        });

        res.status(200).json({
            message:"Post updated Successfully",post
        })
    } catch (error) {
            res.status(500).json({
                message:"Internal Server Error",error:error.message
            });
    }
}

const deletePost=async(req,res)=>{
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).json({
            message:"Post not found"
        });
        res.status(200).json({
            message:"Post successfully deleted"
        });
    } catch (error) {
        res.status(500).json({
                message:"Internal Server Error",error:error.message
            });
    }
}
export {createPost, getPosts, updatePost , deletePost};