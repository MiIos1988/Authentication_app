const UserModel = require("../models/userModel");
const validator = require('validator');

const registerValidation = async (req, res, next) => {
  const data = req.body;

  if (
    !data.email ||
    !validator.isEmail(data.email) ||
    !data.password ||
    data.password.length < 6 ||
    !data.confirmPassword ||
    data.confirmPassword !== data.password ||
    !data.firstName ||
    !data.lastName
  ) {
    return res.status(411).send("Error");
  } else {
    const emailExist = await UserModel.findOne({email: data.email});
    emailExist ?  res.status(412).send("Email exist") : next()
  }
}


module.exports = registerValidation;