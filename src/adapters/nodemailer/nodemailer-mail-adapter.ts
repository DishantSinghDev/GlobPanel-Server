import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";
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

const transport = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  auth: {
    user: "dishis@myanalytics.tech",
    pass: "Bankey@1245",
  },
});



export class NodemailerMailAdapter implements MailAdapter {
  async sendMain({ subject, body }: SendMailData): Promise<void> {
    await transport.sendMail({
      from: `Feedback Form <dishis@myanalytics.tech>`,
      to: "Feedback@MyAnalytics.tech <rdp@globpanel.com>",
      subject,
      html: body,
    });
    
  }
  
}


