export interface SendMailData {
  email?: string,
  name?: string,
  subject: string;
  body: string;
}

export interface MailAdapter {
  sendMain: (data: SendMailData) => Promise<void>;
}