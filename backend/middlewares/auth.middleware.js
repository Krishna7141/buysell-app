const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        console.log(token);
        if(!token) {
            return res.status(404).json({
                success: false,
                message: "Token Not Found",
            })
        }
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch(err) {
            return res.status(400).json({
                success: false,
                message: "Invalid Token"
            })
        }
        next();
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went Wrong, while Authorizing",
        })
    }
}