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
const verifyUserLogin_1 = __importDefault(require("../validation/verifyUserLogin"));
const verifyAdminLogin_1 = __importDefault(require("../validation/verifyAdminLogin"));
const userModel_1 = __importDefault(require("../models/userModel"));
const userRoute = express_1.default.Router();
userRoute.get("/get-all-user", verifyUserLogin_1.default, verifyAdminLogin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield userModel_1.default.find({});
    const forSendAllUsers = allUsers.map((obj) => {
        return {
            firstName: obj.firstName,
            lastName: obj.lastName,
            email: obj.email,
            picture: obj.picture,
            role: obj.role,
            isActive: obj.isActive,
        };
    });
    res.send({ forSendAllUsers });
}));
userRoute.put("/change-user-active", verifyUserLogin_1.default, verifyAdminLogin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUserChangeActive = yield userModel_1.default.findOne({
            email: req.body.email,
        });
        if (findUserChangeActive) {
            findUserChangeActive.isActive = req.body.isActive;
            yield findUserChangeActive.save();
            res.send("Ok");
        }
        else {
            return res.status(415).send("Error");
        }
    }
    catch (err) {
        return res.status(416).send("Error");
    }
}));
userRoute.put("/change-user-role", verifyUserLogin_1.default, verifyAdminLogin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUserChangeRole = yield userModel_1.default.findOne({
            email: req.body.email,
        });
        if (findUserChangeRole) {
            findUserChangeRole.role = req.body.role;
            yield findUserChangeRole.save();
            res.send("Ok");
        }
        else {
            return res.status(415).send("Error");
        }
    }
    catch (err) {
        return res.status(416).send("Error");
    }
}));
exports.default = userRoute;
