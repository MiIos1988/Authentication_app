

const registerValidation = (req, res, next) => {
    const data = req.body;
    const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (
        !data.email ||
        !data.password ||
        !data.confirmPassword ||
        !data.firstName ||
        !data.lastName 
      ) {
        return res.status(401).send("Bad credentials!");
      }
}


module.exports = registerValidation;