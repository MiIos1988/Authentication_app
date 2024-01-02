"use strict";
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "vojvoda1988@gmail.com",
        pass: "pjwzjkitamdhxhxq",
    },
});
const sendMail = function (from, to, subject, html) {
    let mailOptions = {
        from: `"Reset password" ${from}`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: html, // html body
    };
    return transporter.sendMail(mailOptions);
};
module.exports = sendMail;
