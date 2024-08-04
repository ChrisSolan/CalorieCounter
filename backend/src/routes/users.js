const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const { UserModel } = require('../models/UserModel.js');
const jwtToken = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});

    if (user) { return res.json({message: "User Alredy Exists!"}); }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({username, password:hashedPassword });
    await newUser.save();
    res.json({message: "User Registered!"});
});

router.post('/login', async (req, res) => {
    
});

module.exports = {userRouter: router};
