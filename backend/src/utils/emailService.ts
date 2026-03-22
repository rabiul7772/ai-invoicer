import { BrevoClient } from '@getbrevo/brevo';
import { BREVO_API_KEY, SMTP_USER } from '../config/env.js';

const brevo = new BrevoClient({ apiKey: BREVO_API_KEY as string });

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

class EmailService {
  async sendEmail(options: SendEmailOptions) {
    console.log(
      `✉️ Sending email to: ${options.to} | Subject: ${options.subject}`
    );

    try {
      const result = await brevo.transactionalEmails.sendTransacEmail({
        sender: { name: 'AI Invoicer', email: SMTP_USER as string },
        to: [{ email: options.to }],
        subject: options.subject,
        htmlContent: options.html
      });
      console.log('✅ Email sent successfully via Brevo:', result);
    } catch (error) {
      console.error('❌ Send Error:', error);
      throw error;
    }
  }
}

export const emailService = new EmailService();
