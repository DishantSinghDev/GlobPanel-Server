"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodemailerAutoMailAdapter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const prisma_1 = require("../../prisma");
const autoTransport = nodemailer_1.default.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    auth: {
        user: "dishis@myanalytics.tech",
        pass: "Bankey@1245",
    },
});
class NodemailerAutoMailAdapter {
    async sendMain({ subject2, body2, detailname, detailemail, }) {
        const emailData = await prisma_1.prisma.signined.findMany({
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
                }
                else {
                    await prisma_1.prisma.signined.update({
                        data: {
                            emailSent: true,
                        },
                        where: {
                            email: detailemail,
                        },
                    });
                }
            });
        }
        else {
            console.log("email already sent");
        }
    }
}
exports.NodemailerAutoMailAdapter = NodemailerAutoMailAdapter;
