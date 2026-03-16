import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: `"MebKvartal" <${process.env.SMTP_USER}>`,
      to,
      subject: 'Account Activation',
      text: '',
      html: `
        <div style="font-family: Arial">
          <h1>Activate your account</h1>
          <a href="${process.env.API_URL}/auth/activate/${link}">
            Activate
          </a>
        </div>
      `,
    });
  }
}
