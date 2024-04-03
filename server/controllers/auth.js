import bcrypt from bcrypt;
import  Jwt  from "jsonwebtoken";
import User from "../models/User.js";

//register user

export const register = async (req,res) =>{
    try{
        const {
            firstName,
            lastNanme,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastNanme,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedprofile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json({ error: err.message });

    }
};

//Loggng In

export const login = async (req,res)=>{
    try{
        const { email,password } = req.body;
        const user =  await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist. "});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials. "})

        const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    }
    catch(err){
        res.status(500).json({error: err.message });
    }
}