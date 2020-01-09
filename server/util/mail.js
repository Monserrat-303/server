const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(mail,verCode) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "teammonserrat303@gmail.com", // generated ethereal user
      pass: "Mons303#" // generated ethereal password
    }
  });
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });


  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'teammonserrat303@gmail.com', // sender address
    to: mail, // list of receivers
    subject: "Verification Code", // Subject line
    text: '', // plain text body
    html: `<p>${verCode}</p>`
  });
}
/* main().catch(console.error); */
module.exports = main;
