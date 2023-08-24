const express = require('express');
const verifyUserLogin = require('../validation/verifyUserLogin');
const verifyAdminLogin = require('../validation/verifyAdminLogin');
const userRoute = express.Router();

userRoute.get("/get-all-user", verifyUserLogin, verifyAdminLogin, (req, res) => {
    console.log("okeee")
    res.send("okeee")
})



module.exports = userRoute;