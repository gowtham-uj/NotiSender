const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "reyna67@ethereal.email",
    pass: "4Bp2xHYWk6t4EX8hxd",
  },
});
// const transporter = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "ae5f578ddac4d0",
//     pass: "1935667c830cf1",
//   },
// });

module.exports = transporter;
