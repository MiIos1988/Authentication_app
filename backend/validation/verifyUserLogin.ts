const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";

const verifyUserLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(JSON.parse(token), process.env.JWT_SECRET_KEY);
      next();
    } else {
      res.status(414).send("Auth err");
    }
  } catch (err) {
    res.status(414).send("Auth err");
  }
};

module.exports = verifyUserLogin;
