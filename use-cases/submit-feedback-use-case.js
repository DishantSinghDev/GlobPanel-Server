"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitFeedbackUseCase = void 0;
class SubmitFeedbackUseCase {
    constructor(feedbackRepository, mailAdapter) {
        this.feedbackRepository = feedbackRepository;
        this.mailAdapter = mailAdapter;
    }
    async execute(request) {
        const { type, comment, screenshot, name, email } = request;
        if (!type) {
            throw new Error("Type is required.");
        }
        if (!comment) {
            throw new Error("Comment is required.");
        }
        if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
            throw new Error("Invalid screenshot format.");
        }
        await this.feedbackRepository.create({
            type,
            comment,
            screenshot,
            name,
            email,
        });
        await this.mailAdapter.sendMain({
            subject: "Feedback From Myanalytics",
            body: [
                `<div style="font-family: 'Courier New'; font-size: 16px; color: #111;">`,
                name && email ? `<h2>Got a Feedback from <i>${name}</i> with Email: ${email}</h2>` : `<h2>User Is Not LogIn to the Site.</h2`,
                `<p>Type of feedback: <b>${type}</b></p>`,
                `<h3>Feedback: ${comment}</h3>`,
                screenshot ? `<img src="${screenshot}" />` : `No screenshots By User`,
                `</div>`,
            ].join("\n"),
        });
    }
}
exports.SubmitFeedbackUseCase = SubmitFeedbackUseCase;
