const jwt = require("jsonwebtoken");

const verifyAdminLogin = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decode = jwt.decode(JSON.parse(token));
        (decode && decode.role === "admin") ? next() : res.status(415).send("Auth err")
    }
    catch (err) {
        console.log(err)
        res.status(415).send("Auth err")
    }

}

module.exports = verifyAdminLogin;