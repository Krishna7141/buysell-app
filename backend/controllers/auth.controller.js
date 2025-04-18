const mongooose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
require('dotenv').config();

exports.signup = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are Required",
            })
        }
        const userExist = await User.findOne({email});
        if(userExist) {
            return res.status(400).json({
                success: false,
                message: "User already Exists",
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name, email, password: hashedPassword,
        })
        return res.status(200).json({
            success: true,
            message: "Registered Successfully",
            user: user,
        })
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went Wrong, while registering User",
        })
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Enter all fields",
            })
        }
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User not Registered",
            })
        }
        if(await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET, {
                expiresIn: '3h',
            })
            user.token = token;
            // user.password = undefined;
            const options = {
                expires: new Date(Date.now()+3*24*60*1000),
                httpOnly: true,
            }
            return res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User LoggedIn",
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password",
            })
        }
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Login Error, Please Try Again",
        })
    }
}