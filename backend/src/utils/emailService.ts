import nodemailer from 'nodemailer';
import { SMTP_PASS, SMTP_USER } from '../config/env.js';

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: {
    filename: string;
    content: Buffer | Uint8Array;
    contentType: string;
  }[];
}

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify connection configuration
    this.transporter.verify((error: Error | null) => {
      if (error) {
        console.error('SMTP Connection Error:', error);
      } else {
        console.log('SMTP Server is ready to take our messages');
      }
    });
  }

  async sendEmail(options: SendEmailOptions) {
    console.log(
      `✉️ Sending email to: ${options.to} | Subject: ${options.subject}`
    );
    const mailOptions = {
      from: `"AI Invoicer" <${SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      attachments: options.attachments as any
    };

    return await this.transporter.sendMail(mailOptions);
  }
}

export const emailService = new EmailService();
