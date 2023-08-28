const express = require("express");
const authRoute = express.Router();
const UserModel = require("../models/userModel");
const registerValidation = require("../validation/registerValidation");
const bcrypt = require("bcrypt");
const axios = require("axios");
const loginValidation = require("../validation/loginValidation");
const validator = require('validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const saltRounds = 10;
const crypto = require('crypto');
const sendMail = require("../service/mailService");

authRoute.post("/register", registerValidation, async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    const newUser = await UserModel.create(req.body);
    res.send("User registered!");
  } catch (err) {
    res.status(413).send("Error");
  }
});
authRoute.post("/register-google", async (req, res) => {
  try {
    const googleData = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${req.body.token}` },
      }
    );
    const salt = bcrypt.genSaltSync(saltRounds);
    googleData.data.sub = bcrypt.hashSync(googleData.data.sub, salt);
    if (
      !googleData.data.given_name ||
      !googleData.data.family_name ||
      !googleData.data.sub ||
      !googleData.data.email ||
      !validator.isEmail(googleData.data.email)
    ) {
      return res.status(413).send("Error");
    } else {
      const emailExist = await UserModel.findOne({
        email: googleData.data.email,
      });
      if (emailExist) {
        res.status(412).send("Email exist");
      } else {
        console.log(googleData)
        const dataUser = {
          firstName: googleData.data.given_name,
          lastName: googleData.data.family_name,
          email: googleData.data.email,
          picture: googleData.data.picture,
          googleId: googleData.data.sub,
        };
        const newUser = await UserModel.create(dataUser);
        res.send("User registered!");
      }
    }
  } catch (err) {
    console.log(err)
    res.status(413).send("Error");
  }
});

authRoute.post("/login", loginValidation, async (req, res) => {
  let userData = await UserModel.findOne({ email: req.body.email });
  console.log(userData)
  userData = {
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    role: userData.role,
    picture: userData.picture
  };
  const token = jwt.sign(userData, process.env.JWT_SECRET_KEY);
  res.send({ token })
})

authRoute.post("/login-google", async (req, res) => {
  try {
    const googleData = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${req.body.token}` },
      }
    );
    if (
      !googleData.data.sub ||
      !googleData.data.email ||
      !validator.isEmail(googleData.data.email)
    ) {
      return res.status(413).send("Error");
    }
    let userExist = await UserModel.findOne({
      email: googleData.data.email,
    });
    if (!userExist.email ||
      !userExist.googleId ||
      !bcrypt.compareSync(googleData.data.sub, userExist.googleId)
    ) {
      return res.status(413).send("Error");
    }
    if (!userExist.isActive) {
      return res.status(422).send("Admin mast your account!");
    }
    userExist = {
      email: userExist.email,
      firstName: userExist.firstName,
      lastName: userExist.lastName,
      role: userExist.role,
      picture: userExist.picture
    }
    const token = jwt.sign(userExist, process.env.JWT_SECRET_KEY);
    res.send({ token })
  } catch (err) {
    console.log(err)
    res.status(414).send("Error");
  }
});

authRoute.post("/reset-password", async (req, res) => {
  try{
  const token = crypto.randomBytes(32).toString('hex');
  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + 30);
  const setTokenForChangePass = await UserModel.findOne({ email: req.body.email });
  setTokenForChangePass.tokenForResetPasswordAndExpiration.token = token
  setTokenForChangePass.tokenForResetPasswordAndExpiration.expirationDate = expirationDate
  const text = `Click the following link to reset your password: http://localhost:3000/new-password/${token}`
  console.log(req.body.email)
  sendMail("vojvoda1988@gmail.com", req.body.email, "Password Reset", text)
  res.json({ message: 'A password reset request has been sent to your email address.' });
  }catch(err){
    console.log(err)
    res.status(415).send("Email not exist")
  }
})

module.exports = authRoute;
