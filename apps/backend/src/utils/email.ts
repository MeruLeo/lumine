// utils/sendMail.ts
import nodemailer from "nodemailer";
import { SMTP_USER, SMTP_PASS } from "../configs/tokens";

export interface MailOptions {
  to: string;
  subject: string;
  html: string;
  fromName?: string; // اختیاری
}

export const sendMail = async ({
  to,
  subject,
  html,
  fromName = "Lumine",
}: MailOptions) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"${fromName}" <${SMTP_USER}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};
