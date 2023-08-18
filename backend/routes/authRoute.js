const express = require("express");
const authRoute = express.Router();
const UserModel = require("../models/userModel");
const registerValidation = require("../validation/registerValidation");
const bcrypt = require("bcrypt");
const axios = require("axios");
const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

authRoute.post("/register", registerValidation, async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const newUser = await UserModel.create(req.body);
    newUser.save();
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
    if (
      !googleData.data.given_name ||
      !googleData.data.family_name ||
      !googleData.data.sub ||
      !googleData.data.email ||
      !emailRegexp.test(googleData.data.email)
    ) {
      return res.status(413).send("Error");
    } else {
      const dataUser = {
        firstName: googleData.data.given_name,
        lastName: googleData.data.family_name,
        email: googleData.data.email,
        googleId: googleData.data.sub,
      };
      const newUser = await UserModel.create(dataUser);
      newUser.save();
      res.send("User registered!");
    }
  } catch (err) {
    res.status(413).send("Error");
  }
});

module.exports = authRoute;
