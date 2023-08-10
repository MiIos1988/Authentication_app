const express = require('express');
const authRoute = express.Router();
const UserModel = require('../models/userModel');
const registerValidation = require('../validation/registerValidation');

authRoute.post("/register", registerValidation, (req, res) => {
    console.log(req.body)
    
    res.send("ok")

});







module.exports = authRoute