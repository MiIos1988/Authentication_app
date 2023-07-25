const express = require('express');
const authRoute = express.Router();
const UserModel = require('../models/userModel')

authRoute.post("register", (req, res) => {
    console.log("work")
});







module.exports = authRoute