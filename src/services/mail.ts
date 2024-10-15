const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  },
});

export async function sendOTP(userMailID: string, otp: number, name: string) {
  // send mail with defined transport object

  const info = await transporter
    .sendMail({
      from: '"Twitter " <no-reply@twitter.com>', // sender address
      to: userMailID, // list of receivers
      subject: "Verify your email address", // Subject line
      html: `
      <h1 style={{text-align:"center"}}>Verify your email for Twitter Account</h1>
      <h2>Hello ${name}!</h2>
      <p>Your OTP is:</p>
      <h2><b>${otp}</b></h2>
      <p>Please, do not share this code to anyone.</p>
      `,
    })
    .then(() => {
      console.log("Message sent: %s", info.messageId);
      return "OTP sent to email";
    })
    .catch((e: Error) => {
      console.log(e);
      return "Something went wrong" + e;
    });
}
