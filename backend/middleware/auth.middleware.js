import jwt from 'jsonwebtoken'
import User from '../models/User.models.js'

export default async function protect(req, res, next) {
    let token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({message:"Not authorized, no token found!"});

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        // Exclude the password field from the result when querying the database.
        req.user = await User.findById(decode.id).select("-password");
        // console.log(decode.id);
        // console.log(decode._id);     //see generate token {id} if want _id then {_id}
        console.log(req.user.id);
        next();
    } catch (err) {
        res.status(401).json({message:"Not authorized, token failed1"});
    }
}