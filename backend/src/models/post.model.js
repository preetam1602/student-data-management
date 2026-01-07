import mongoose, {Schema} from "mongoose";

const postSchema =new Schema({
    name:{
        type:String,
        required:true,
    },
    usn:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true
    },
    branch:{
        type:String,
        required:true
    }
}, {timestamps:true}
);

export const Post=mongoose.model("Post",postSchema);