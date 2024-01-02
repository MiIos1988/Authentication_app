"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute = express_1.default.Router();
const UserModel = require("../models/userModel");
const registerValidation = require("../validation/registerValidation");
const bcrypt = require("bcrypt");
const axios = require("axios");
const loginValidation = require("../validation/loginValidation");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const saltRounds = 10;
const crypto = require("crypto");
const sendMail = require("../service/mailService");
authRoute.post("/register", registerValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = bcrypt.genSaltSync(saltRounds);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        const newUser = yield UserModel.create(req.body);
        res.send("User registered!");
    }
    catch (err) {
        res.status(413).send("Error");
    }
}));
authRoute.post("/register-google", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const googleData = yield axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${req.body.token}` },
        });
        const salt = bcrypt.genSaltSync(saltRounds);
        googleData.data.sub = bcrypt.hashSync(googleData.data.sub, salt);
        if (!googleData.data.given_name ||
            !googleData.data.family_name ||
            !googleData.data.sub ||
            !googleData.data.email ||
            !validator.isEmail(googleData.data.email)) {
            return res.status(413).send("Error");
        }
        else {
            const emailExist = yield UserModel.findOne({
                email: googleData.data.email,
            });
            if (emailExist) {
                res.status(412).send("Email exist");
            }
            else {
                console.log(googleData);
                const dataUser = {
                    firstName: googleData.data.given_name,
                    lastName: googleData.data.family_name,
                    email: googleData.data.email,
                    picture: googleData.data.picture,
                    googleId: googleData.data.sub,
                };
                const newUser = yield UserModel.create(dataUser);
                res.send("User registered!");
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(413).send("Error");
    }
}));
authRoute.post("/login", loginValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userData = yield UserModel.findOne({ email: req.body.email });
    console.log(userData);
    userData = {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        picture: userData.picture,
    };
    const token = jwt.sign(userData, process.env.JWT_SECRET_KEY);
    res.send({ token });
}));
authRoute.post("/login-google", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const googleData = yield axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${req.body.token}` },
        });
        if (!googleData.data.sub ||
            !googleData.data.email ||
            !validator.isEmail(googleData.data.email)) {
            return res.status(413).send("Error");
        }
        let userExist = yield UserModel.findOne({
            email: googleData.data.email,
        });
        if (!userExist.email ||
            !userExist.googleId ||
            !bcrypt.compareSync(googleData.data.sub, userExist.googleId)) {
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
            picture: userExist.picture,
        };
        const token = jwt.sign(userExist, process.env.JWT_SECRET_KEY);
        res.send({ token });
    }
    catch (err) {
        console.log(err);
        res.status(414).send("Error");
    }
}));
authRoute.post("/reset-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = crypto.randomBytes(32).toString("hex");
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 15);
        const setTokenForChangePass = yield UserModel.findOne({
            email: req.body.email,
        });
        setTokenForChangePass.tokenForResetPasswordAndExpiration.token = token;
        setTokenForChangePass.tokenForResetPasswordAndExpiration.expirationDate =
            expirationDate;
        yield setTokenForChangePass.save();
        const text = `Click the following link to reset your password: http://localhost:3000/new-password/${token}`;
        sendMail("vojvoda1988@gmail.com", req.body.email, "Password Reset", text);
        res.json({
            message: "A password reset request has been sent to your email address.",
        });
    }
    catch (err) {
        console.log(err);
        res.status(415).send("Email not exist");
    }
}));
authRoute.post("/check-token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const searchToken = yield UserModel.findOne({
        "tokenForResetPasswordAndExpiration.token": req.body.token,
        "tokenForResetPasswordAndExpiration.expirationDate": { $gte: new Date() },
    });
    searchToken
        ? res.send("Ok")
        : res.status(417).json({ message: "Token not valid!" });
}));
authRoute.post("/new-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchToken = yield UserModel.findOne({
            "tokenForResetPasswordAndExpiration.token": req.body.token,
            "tokenForResetPasswordAndExpiration.expirationDate": { $gte: new Date() },
        });
        if (searchToken) {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);
            yield UserModel.findByIdAndUpdate(searchToken._id, {
                password: hashedPassword,
                $unset: { tokenForResetPasswordAndExpiration: 1 },
            });
            res
                .status(200)
                .json({ message: "You have successfully changed the password!." });
        }
        else {
            res
                .status(400)
                .json({ error: "Invalid or expired password reset token." });
        }
    }
    catch (err) {
        res
            .status(400)
            .json({ error: "An error occurred while changing the password." });
    }
}));
exports.default = authRoute;
