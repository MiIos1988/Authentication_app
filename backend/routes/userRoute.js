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

userRoute.put("/change-user-active", verifyUserLogin, verifyAdminLogin, async (req, res) => {
    try{
   const findUserChangeActive = await UserModel.findOne({email: req.body.email});
  if (findUserChangeActive) {
    findUserChangeActive.isActive = req.body.isActive 
    await findUserChangeActive.save()
  }else{
    return res.status(415).send("Error")
  } 
   
    res.send("Ok")
    }
    catch(err){
        return res.status(416).send("Error")
    }
})



module.exports = userRoute;