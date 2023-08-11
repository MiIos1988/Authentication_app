const express = require('express');
const authRoute = express.Router();
const UserModel = require('../models/userModel');
const registerValidation = require('../validation/registerValidation');
const bcrypt = require('bcrypt');

authRoute.post("/register", registerValidation, async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    try{
        const newUser = await UserModel.create(req.body);
        newUser.save();
        res.send("User registered!")
    }
    catch(err){
        res.status(413).send("Error")
    }
    

});







module.exports = authRoute