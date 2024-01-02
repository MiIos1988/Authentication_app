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
const userModel_1 = __importDefault(require("../models/userModel"));
const validator_1 = __importDefault(require("validator"));
const registerValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!data.email ||
        !validator_1.default.isEmail(data.email) ||
        !data.password ||
        data.password.length < 6 ||
        !data.confirmPassword ||
        data.confirmPassword !== data.password ||
        !data.firstName ||
        !data.lastName) {
        return res.status(411).send("Error");
    }
    else {
        const emailExist = yield userModel_1.default.findOne({ email: data.email });
        emailExist ? res.status(412).send("Email exist") : next();
    }
});
exports.default = registerValidation;
