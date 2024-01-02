"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyUserLogin = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            if (process.env.JWT_SECRET_KEY) {
                jsonwebtoken_1.default.verify(JSON.parse(token), process.env.JWT_SECRET_KEY);
                next();
            }
        }
        else {
            res.status(414).send("Auth err");
        }
    }
    catch (err) {
        res.status(414).send("Auth err");
    }
};
exports.default = verifyUserLogin;
