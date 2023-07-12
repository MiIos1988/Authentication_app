const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const portNumber = 5000;





const app = express();










app.listen(portNumber, (err) => {
    err
        ? console.log("Error on server start...")
        : console.log(`Server is running on port ${portNumber}...`)
}
)


