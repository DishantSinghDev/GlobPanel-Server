import nodemailer from "nodemailer";
import { autoMailAdapter, autoSendMailData } from "../auto-mail-adapter";
import { prisma } from "../../prisma";

const autoTransport = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  auth: {
    user: "dishis@myanalytics.tech",
    pass: "Bankey@1245",
  },
});

export class NodemailerAutoMailAdapter implements autoMailAdapter {
  async sendMain({
    subject2,
    body2,
    detailname,
    detailemail,
  }: autoSendMailData): Promise<void> {
    const emailData = await prisma.signined.findMany({
      where: {
        email: detailemail,
      },
    });
    let sentMessage = emailData[0].emailSent;

    const message = {
      from: `MyAnalytics <dishis@myanalytics.tech>`,
      to: `${detailname} <${detailemail}>`,
      subject: subject2,
      html: body2,
    };
    if (sentMessage == false) {
      await autoTransport.sendMail(message, async function (err, data) {
        if (err) {
          console.log("Error Occurs");
        } else {
          await prisma.signined.update({
            data: {
              emailSent: true,
            },
            where: {
              email: detailemail,
            },
          });
        }
      });
    } else {
        console.log("email already sent")
    }
  }
}
