import  nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vojvoda1988@gmail.com",
    pass: "pjwzjkitamdhxhxq",
  },
});
const sendMail = function (
  from: string,
  to: string,
  subject: string,
  html: string
) {
  let mailOptions = {
    from: `"Reset password" ${from}`, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: html, // html body
  };
  return transporter.sendMail(mailOptions);
};

export default sendMail;
