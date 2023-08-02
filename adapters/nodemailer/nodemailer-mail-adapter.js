"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodemailerMailAdapter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// const auth = {
//   auth: {
//     api_key: process.env.API_KEY,
//     domain: process.env.DOMAIN,
//   },
// };
// let transporter = nodemailer.createTransport(mailGun(auth));
// let mailOptions = {
//   from: "abc@gmail.com", // TODO: email sender
//   to: "feedback@myanalytics.tech", // TODO: email receiver
//   subject: "Nodemailer - Test",
//   text: "Wooohooo it works!!",
// };
// // Step 4
// transporter.sendMail(mailOptions, (err, data) => {
//   if (err) {
//     return Error("Error occurs");
//   }
//   return alert("Email sent!!!");
// });
const transport = nodemailer_1.default.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    auth: {
        user: "dishis@myanalytics.tech",
        pass: "Bankey@1245",
    },
});
class NodemailerMailAdapter {
    async sendMain({ subject, body }) {
        await transport.sendMail({
            from: `Feedback Form <dishis@myanalytics.tech>`,
            to: "Feedback@MyAnalytics.tech <rdp@globpanel.com>",
            subject,
            html: body,
        });
    }
}
exports.NodemailerMailAdapter = NodemailerMailAdapter;
