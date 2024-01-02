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
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel = require("../models/userModel");
const validator = require("validator");
const registerValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!data.email ||
        !validator.isEmail(data.email) ||
        !data.password ||
        data.password.length < 6 ||
        !data.confirmPassword ||
        data.confirmPassword !== data.password ||
        !data.firstName ||
        !data.lastName) {
        return res.status(411).send("Error");
    }
    else {
        const emailExist = yield UserModel.findOne({ email: data.email });
        emailExist ? res.status(412).send("Email exist") : next();
    }
});
module.exports = registerValidation;
