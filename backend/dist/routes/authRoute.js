"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const userModel_1 = __importDefault(require("../models/userModel"));
const registerValidation_1 = __importDefault(require("../validation/registerValidation"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const axios_1 = __importDefault(require("axios"));
const loginValidation_1 = __importDefault(require("../validation/loginValidation"));
const validator_1 = __importDefault(require("validator"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const saltRounds = 10;
const crypto_1 = __importDefault(require("crypto"));
const mailService_1 = __importDefault(require("../service/mailService"));
authRoute.post("/register", registerValidation_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = bcrypt_1.default.genSaltSync(saltRounds);
        req.body.password = bcrypt_1.default.hashSync(req.body.password, salt);
        const newUser = yield userModel_1.default.create(req.body);
        res.send("User registered!");
    }
    catch (err) {
        res.status(413).send("Error");
    }
}));
authRoute.post("/register-google", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const googleData = yield axios_1.default.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${req.body.token}` },
        });
        const salt = bcrypt_1.default.genSaltSync(saltRounds);
        googleData.data.sub = bcrypt_1.default.hashSync(googleData.data.sub, salt);
        if (!googleData.data.given_name ||
            !googleData.data.family_name ||
            !googleData.data.sub ||
            !googleData.data.email ||
            !validator_1.default.isEmail(googleData.data.email)) {
            return res.status(413).send("Error");
        }
        else {
            const emailExist = yield userModel_1.default.findOne({
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
                const newUser = yield userModel_1.default.create(dataUser);
                res.send("User registered!");
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(413).send("Error");
    }
}));
authRoute.post("/login", loginValidation_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userData = yield userModel_1.default.findOne({ email: req.body.email });
    console.log(userData);
    if (userData) {
        const userDataSend = {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role,
            picture: userData.picture,
        };
        if (process.env.JWT_SECRET_KEY) {
            const token = jsonwebtoken_1.default.sign(userDataSend, process.env.JWT_SECRET_KEY);
            res.send({ token });
        }
    }
}));
authRoute.post("/login-google", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const googleData = yield axios_1.default.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${req.body.token}` },
        });
        if (!googleData.data.sub ||
            !googleData.data.email ||
            !validator_1.default.isEmail(googleData.data.email)) {
            return res.status(413).send("Error");
        }
        let userExist = yield userModel_1.default.findOne({
            email: googleData.data.email,
        });
        if (userExist) {
            if (!userExist.email ||
                !userExist.googleId ||
                !bcrypt_1.default.compareSync(googleData.data.sub, userExist.googleId)) {
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
                const token = jsonwebtoken_1.default.sign(userExistSend, process.env.JWT_SECRET_KEY);
                res.send({ token });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(414).send("Error");
    }
}));
authRoute.post("/reset-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = crypto_1.default.randomBytes(32).toString("hex");
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 15);
        const setTokenForChangePass = yield userModel_1.default.findOne({
            email: req.body.email,
        });
        if (setTokenForChangePass) {
            if (setTokenForChangePass.tokenForResetPasswordAndExpiration) {
                setTokenForChangePass.tokenForResetPasswordAndExpiration.token = token;
                setTokenForChangePass.tokenForResetPasswordAndExpiration.expirationDate =
                    expirationDate;
            }
            yield setTokenForChangePass.save();
        }
        const text = `Click the following link to reset your password: http://localhost:3000/new-password/${token}`;
        (0, mailService_1.default)("vojvoda1988@gmail.com", req.body.email, "Password Reset", text);
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
    const searchToken = yield userModel_1.default.findOne({
        "tokenForResetPasswordAndExpiration.token": req.body.token,
        "tokenForResetPasswordAndExpiration.expirationDate": { $gte: new Date() },
    });
    searchToken
        ? res.send("Ok")
        : res.status(417).json({ message: "Token not valid!" });
}));
authRoute.post("/new-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchToken = yield userModel_1.default.findOne({
            "tokenForResetPasswordAndExpiration.token": req.body.token,
            "tokenForResetPasswordAndExpiration.expirationDate": { $gte: new Date() },
        });
        if (searchToken) {
            const salt = bcrypt_1.default.genSaltSync(saltRounds);
            const hashedPassword = bcrypt_1.default.hashSync(req.body.password, salt);
            yield userModel_1.default.findByIdAndUpdate(searchToken._id, {
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
