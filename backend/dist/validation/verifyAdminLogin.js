"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const verifyAdminLogin = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            const decode = jwt.decode(JSON.parse(token));
            decode && decode.role === "admin"
                ? next()
                : res.status(415).send("Auth err");
        }
    }
    catch (err) {
        console.log(err);
        res.status(415).send("Auth err");
    }
};
exports.default = verifyAdminLogin;
