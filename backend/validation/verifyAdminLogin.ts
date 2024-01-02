const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";

const verifyAdminLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decode = jwt.decode(JSON.parse(token));
      decode && decode.role === "admin"
        ? next()
        : res.status(415).send("Auth err");
    }
  } catch (err) {
    console.log(err);
    res.status(415).send("Auth err");
  }
};

export default verifyAdminLogin;
