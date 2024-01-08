import express from "express";
const authRoute = express.Router();
import UserModel from "../models/userModel";
import registerValidation from "../validation/registerValidation";
import bcrypt from "bcrypt";
import axios from "axios";
import loginValidation from "../validation/loginValidation";
import validator from "validator";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const saltRounds = 10;
import crypto from "crypto";
import sendMail from "../service/mailService";

authRoute.post("/register", registerValidation, async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    await UserModel.create(req.body);
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
    console.log(err);
    res.status(413).send("Error");
  }
});

authRoute.post("/login", loginValidation, async (req, res) => {
  let userData = await UserModel.findOne({ email: req.body.email });
  if (userData) {
    const userDataSend = {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role,
      picture: userData.picture,
    };
    if (process.env.JWT_SECRET_KEY) {
      const token = jwt.sign(userDataSend, process.env.JWT_SECRET_KEY);
      res.send({ token });
    }
  }
});

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
    if (userExist) {
      if (
        !userExist.email ||
        !userExist.googleId ||
        !bcrypt.compareSync(googleData.data.sub, userExist.googleId)
      ) {
        return res.status(413).send("Error");
      }
      if (!userExist.isActive) {
        return res.status(422).send("Admin mast your account!");
      }
      const userExistSend = {
        email: userExist.email,
        firstName: userExist.firstName,
        lastName: userExist.lastName,
        role: userExist.role,
        picture: userExist.picture,
      };
      if (process.env.JWT_SECRET_KEY) {
        const token = jwt.sign(userExistSend, process.env.JWT_SECRET_KEY);
        res.send({ token });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(414).send("Error");
  }
});

authRoute.post("/reset-password", async (req, res) => {
  try {
    const token = crypto.randomBytes(32).toString("hex");
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 15);

    const setTokenForChangePass = await UserModel.findOne({
      email: req.body.email,
    });
    if (setTokenForChangePass) {
      if (setTokenForChangePass.tokenForResetPasswordAndExpiration) {
        setTokenForChangePass.tokenForResetPasswordAndExpiration.token = token;
        setTokenForChangePass.tokenForResetPasswordAndExpiration.expirationDate =
          expirationDate;
      }

      await setTokenForChangePass.save();
    }

    const text = `Click the following link to reset your password: http://localhost:3000/new-password/${token}`;

    sendMail("vojvoda1988@gmail.com", req.body.email, "Password Reset", text);
    res.json({
      message: "A password reset request has been sent to your email address.",
    });
  } catch (err) {
    console.log(err);
    res.status(415).send("Email not exist");
  }
});

authRoute.post("/check-token", async (req, res) => {
  console.log(req.body);
  const searchToken = await UserModel.findOne({
    "tokenForResetPasswordAndExpiration.token": req.body.token,
    "tokenForResetPasswordAndExpiration.expirationDate": { $gte: new Date() },
  });

  searchToken
    ? res.send("Ok")
    : res.status(417).json({ message: "Token not valid!" });
});

authRoute.post("/new-password", async (req, res) => {
  try {
    const searchToken = await UserModel.findOne({
      "tokenForResetPasswordAndExpiration.token": req.body.token,
      "tokenForResetPasswordAndExpiration.expirationDate": { $gte: new Date() },
    });
    if (searchToken) {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      await UserModel.findByIdAndUpdate(searchToken._id, {
        password: hashedPassword,
        $unset: { tokenForResetPasswordAndExpiration: 1 },
      });
      res
        .status(200)
        .json({ message: "You have successfully changed the password!." });
    } else {
      res
        .status(400)
        .json({ error: "Invalid or expired password reset token." });
    }
  } catch (err) {
    res
      .status(400)
      .json({ error: "An error occurred while changing the password." });
  }
});

export default authRoute;
