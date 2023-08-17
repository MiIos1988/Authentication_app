const express = require('express');
const authRoute = express.Router();
const UserModel = require('../models/userModel');
const registerValidation = require('../validation/registerValidation');
const bcrypt = require('bcrypt');
const axios = require('axios')

authRoute.post("/register", registerValidation, async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    try {
        const newUser = await UserModel.create(req.body);
        newUser.save();
        res.send("User registered!");
    }
    catch (err) {
        res.status(413).send("Error");
    }
});
authRoute.post("/register-google", async (req, res) => {
    const googleData = await axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${req.body.token}` },
        })
        console.log(googleData)

    res.send("User registered!");
})






module.exports = authRoute