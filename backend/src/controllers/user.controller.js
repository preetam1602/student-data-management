import { User } from "../models/user.model.js";

const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Username or email already exists"
      });
    }

    const newUser = new User({
      username,
      password,
      email
    });

    await newUser.save();

    return res.status(201).json({
      message: "User created successfully"
    });
  } catch (error) {
    console.error(error); // 👈 important
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};

const loginUser = async(req,res)=>{
    try {
        //check if user already exists
        const {email,password}=req.body;

        const user= await User.findOne({
            email:email.toLowerCase()
        });

        if(!user) return res.status(400).json({
            meaasage: "User not found"
        });

        //compare passwords
        const isMatch=await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            message:"Invalid credentials"
        })

        res.status(200).json({
            message:"user logged in",
            user:{
                id:user._id,
                email:user.email,
                username:user.username
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:"internal server error"
        });
    }
};

const logoutuser=async(req,res)=>{
    try {
        const {email}=req.body;
        const user=await User.findOne({
            email
        });

        if(!user) return res.status(404).json({
            message:"user not found"
        });

        res.status(200).json({
            message:"Logout successful"
        });
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",error
        });
    }
};
export { createUser, loginUser, logoutuser };