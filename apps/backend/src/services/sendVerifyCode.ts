import { VerificationCode } from "../models/verificationCode";
import { sendMail } from "../utils/email";

export const sendVerificationEmail = async (
  email: string,
  title: string,
  subject: string,
  type: string
) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await VerificationCode.deleteMany({ email, type: "email", verified: false });

  const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

  await VerificationCode.create({
    email,
    code,
    type,
    expiresAt,
  });

  const html = `
    <h1>${title}</h1>
    <p>کد تایید شما: <strong>${code}</strong></p>
    <p>این کد فقط تا ۲ دقیقه دیگر معتبر است.</p>
  `;

  await sendMail({
    to: email,
    subject,
    html,
  });
};
