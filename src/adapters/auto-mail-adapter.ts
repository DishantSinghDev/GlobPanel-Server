export interface autoSendMailData {
  subject2: string;
  body2: string;
  detailname: string;
  detailemail: string;
}

export interface autoMailAdapter {
  sendMain: (data: autoSendMailData) => Promise<void>;
}
