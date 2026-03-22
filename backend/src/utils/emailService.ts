import nodemailer from 'nodemailer';
import dns from 'dns';
import { SMTP_PASS, SMTP_USER } from '../config/env.js';

// Force IPv4 preference for Node.js DNS resolution (Fixes Render ENETUNREACH)
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

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
      host: '74.125.137.108', // One of Gmail's IPv4 addresses
      port: 465,
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      },
      tls: {
        servername: 'smtp.gmail.com', // Required for certificate validation
        rejectUnauthorized: false
      }
    } as any);

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
