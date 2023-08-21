const validator = require('validator');
const UserModel = require('../models/userModel');
const bcrypt = require("bcrypt");

const loginValidation = async (req, res, next) => {
    const data = req.body;

    if( !data.email  ||
        !validator.isEmail(data.email) ||
        !data.password ||
        data.password < 6
        ){
            res.status(412).send("Error");
        }else {
            const userExist = await UserModel.findOne({email: data.email});
            console.log(userExist)
            if(!userExist){
              return  res.status(420).send("Email error");
            }
            if(!bcrypt.compareSync(data.password, userExist.password)){
                return  res.status(421).send("Password error");
            }
            if(!userExist.isActive){
                return res.status(422).send("Admin mast your account!");
            }
            next();
        }

}

module.exports = loginValidation;