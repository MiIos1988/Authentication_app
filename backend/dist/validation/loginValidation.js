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
const validator_1 = __importDefault(require("validator"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!data.email ||
        !validator_1.default.isEmail(data.email) ||
        !data.password ||
        data.password < 6) {
        res.status(412).send("Error");
    }
    else {
        const userExist = yield userModel_1.default.findOne({ email: data.email });
        console.log(userExist);
        if (!userExist) {
            return res.status(420).send("Email error");
        }
        if (!bcrypt_1.default.compareSync(data.password, userExist.password)) {
            return res.status(421).send("Password error");
        }
        if (!userExist.isActive) {
            return res.status(422).send("Admin mast your account!");
        }
        next();
    }
});
exports.default = loginValidation;
