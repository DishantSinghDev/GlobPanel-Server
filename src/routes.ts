import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { NodemailerAutoMailAdapter } from './adapters/nodemailer/nodemailer-auto-response';
import { PrismaSigninRepository } from './repositories/prisma/prisma-signin-repository';
import { SubmitSigninUseCase } from './use-cases/submit-signin-use-case';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot, name, email } = req.body;

  try {
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
      prismaFeedbacksRepository,
      nodemailerMailAdapter,
    );

    await submitFeedbackUseCase.execute({
      type,
      comment,
      screenshot,
      name,
      email
    });

    return res.status(201).send();
  } catch (err) {
    console.log(err);

    return res.status(500).send();
  }
  
});

routes.post('/signined', async (req, res) => {
  const { name, email } = req.body;
  try {
    const prismaSigninRepository = new PrismaSigninRepository();
    const nodemailerAutoMailAdapter = new NodemailerAutoMailAdapter();

    const submitSigninUseCase = new SubmitSigninUseCase(
      prismaSigninRepository,
      nodemailerAutoMailAdapter,
    );

    await submitSigninUseCase.execute({
      name,
      email
    });

    return res.status(201).send();
  } catch (err) {
    console.log(err);

    return res.status(500).send();
  }
});
