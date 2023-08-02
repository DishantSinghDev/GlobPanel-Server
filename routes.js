"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const nodemailer_mail_adapter_1 = require("./adapters/nodemailer/nodemailer-mail-adapter");
const prisma_feedbacks_repository_1 = require("./repositories/prisma/prisma-feedbacks-repository");
const submit_feedback_use_case_1 = require("./use-cases/submit-feedback-use-case");
const nodemailer_auto_response_1 = require("./adapters/nodemailer/nodemailer-auto-response");
const prisma_signin_repository_1 = require("./repositories/prisma/prisma-signin-repository");
const submit_signin_use_case_1 = require("./use-cases/submit-signin-use-case");
exports.routes = express_1.default.Router();
exports.routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot, name, email } = req.body;
    try {
        const prismaFeedbacksRepository = new prisma_feedbacks_repository_1.PrismaFeedbacksRepository();
        const nodemailerMailAdapter = new nodemailer_mail_adapter_1.NodemailerMailAdapter();
        const submitFeedbackUseCase = new submit_feedback_use_case_1.SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerMailAdapter);
        await submitFeedbackUseCase.execute({
            type,
            comment,
            screenshot,
            name,
            email
        });
        return res.status(201).send();
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});
exports.routes.post('/signined', async (req, res) => {
    const { name, email } = req.body;
    try {
        const prismaSigninRepository = new prisma_signin_repository_1.PrismaSigninRepository();
        const nodemailerAutoMailAdapter = new nodemailer_auto_response_1.NodemailerAutoMailAdapter();
        const submitSigninUseCase = new submit_signin_use_case_1.SubmitSigninUseCase(prismaSigninRepository, nodemailerAutoMailAdapter);
        await submitSigninUseCase.execute({
            name,
            email
        });
        return res.status(201).send();
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});
