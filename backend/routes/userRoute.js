const express = require('express');
const userRoute = express.Router();

userRoute.get("/get-all-user", (req, res) => {
    console.log(req.header("Authorization"));
    res.send("okeee")
})



module.exports = userRoute;