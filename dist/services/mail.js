"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = sendOTP;
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
function sendOTP(userMailID, otp, name) {
    return __awaiter(this, void 0, void 0, function* () {
        // send mail with defined transport object
        const info = yield transporter
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
            .catch((e) => {
            console.log(e);
            return "Something went wrong" + e;
        });
    });
}
