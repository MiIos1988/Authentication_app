"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const verifyUserLogin = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            jwt.verify(JSON.parse(token), process.env.JWT_SECRET_KEY);
            next();
        }
        else {
            res.status(414).send("Auth err");
        }
    }
    catch (err) {
        res.status(414).send("Auth err");
    }
};
module.exports = verifyUserLogin;
