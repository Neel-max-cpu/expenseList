import jwt from 'jsonwebtoken'
import User from '../models/User.models.js'


// generate jwt token
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"1h"});
};


//register user
export async function registerUser(req, res) {
    const {fullName, email, password, profileImgUrl} = req.body;
    // validation check for missing fields
    if(!fullName || !email || !password){       
        return res.status(400).json({message:"All fields are required"});
    }

    try {
        // check if email alread exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User with than email already exists!"});
        }

        // create the user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImgUrl,
        });

        res.status(201).json({
            message:"User created successfully!",
            id:user._id,
            user, 
            token:generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({
            message:"Error registering the user",
            error:err.message
        });
    }
}

// login user
export async function loginUser(req, res) {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"All fields are required!"})
    }

    try {
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password)) ){
            return res.status(400).json({message:"Invalid credentials!"});
        }
        
        res.status(200).json({
            id:user._id,
            user,
            token: generateToken(user._id)
        });
    } catch (err) {
         res.status(500).json({
            message:"Error while loggin in!",
            error:err.message
        });
    }
}

// get all user
export async function getUserInfo(req, res) {    
    try {
        // Exclude the password field from the result when querying the database.
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            res.status(400).json({message:"User not found!"});
        }

        res.status(200).json(user);        
    } catch (err) {
        res.status(500).json({
            message:"Error while finding the user!",
            error:err.message
        });
    }
}