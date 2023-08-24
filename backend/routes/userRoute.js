const express = require('express');
const verifyUserLogin = require('../validation/verifyUserLogin');
const verifyAdminLogin = require('../validation/verifyAdminLogin');
const UserModel = require('../models/userModel');
const userRoute = express.Router();

userRoute.get("/get-all-user", verifyUserLogin, verifyAdminLogin, async (req, res) => {
    const allUsers = await UserModel.find({});
    const forSendAllUsers = allUsers.map(obj => {
        return newObj = {
            firstName: obj.firstName,
            lastName: obj.lastName,
            email: obj.email,
            picture: obj.picture,
            role: obj.role,
            isActive: obj.isActive,
        }
    })
    res.send({forSendAllUsers})
})



module.exports = userRoute;