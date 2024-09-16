const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const { UserModel } = require('../models/UserModel.js');
const jwtToken = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});

    //if the user already exists, reply with the message below
    if (user) { return res.json({message: "User Alredy Exists!"}); }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({username, password:hashedPassword });
    await newUser.save();
    res.json({message: "User Registered!"});
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});

    //if the user doesn't exist, reply with the message below
    if (!user) { return res.status(404).json({message: "User Doesn't Exist!"}); }

    const isPasswordValid = await bcrypt.compare(password, user.password); //compares the hashed password of an established user to the password we are inputing for login
    if (!isPasswordValid) {
        return res.status(401).json({message: "Username or Password Is Incorrect!"});
    }

    //Use an ENV variable for the secret, because it will be used to verifiy if the token is the same across sessions
    const token = jwt.sign({id: user._id}, jwtToken); //the secret was replaced with the ENV that we stored the secret in for extra security

    res.status(200).json({token: token, userID: user._id});


});

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, jwtToken, (err) => {
            if (err) return res.sendStatus(403); //user is NOT verified
            next();
        });
    } else { res.sendStatus(401); } //no token to verify, user is NOT verified
}

module.exports = {userRouter: router, verifyToken: verifyToken};
