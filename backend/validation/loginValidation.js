const validator = require('validator');

const loginValidation = (req, res, next) => {
    const data = req.body;

    if( !data.email  ||
        !data.password ||
        !validator.isEmail(data.email) ||
        data.password < 6
        ){
            res.status(412).send("Error");
        }else{
            next();
        }

}

module.exports = loginValidation;