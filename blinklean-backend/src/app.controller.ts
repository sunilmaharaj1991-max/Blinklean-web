import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import * as nodemailer from 'nodemailer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('green-club/send-email')
  async sendGreenClubEmail(
    @Body() body: { name: string; email: string; phone: string; address: string; eventTitle?: string },
  ) {
    const { name, email, phone, address, eventTitle } = body;

    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
        <div style="text-align: center; border-bottom: 2px solid #10b981; padding-bottom: 15px; margin-bottom: 20px;">
          <h1 style="color: #059669; margin: 0; font-size: 24px;">BlinKlean Green Club</h1>
          <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px; font-weight: bold;">Be the Change for a Cleaner Tomorrow</p>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6;">Dear <strong>${name}</strong>,</p>
        <p style="font-size: 16px; line-height: 1.6;">Thank you for registering to join the <strong>BlinKlean Green Club</strong>! We are thrilled to have you as part of our green community.</p>
        
        <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #166534; margin: 0 0 10px 0; font-size: 16px;">Registration Details:</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 4px 0; color: #475569; width: 120px;"><strong>Name:</strong></td>
              <td style="padding: 4px 0; color: #1e293b;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #475569;"><strong>Email:</strong></td>
              <td style="padding: 4px 0; color: #1e293b;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #475569;"><strong>Phone:</strong></td>
              <td style="padding: 4px 0; color: #1e293b;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #475569;"><strong>Address:</strong></td>
              <td style="padding: 4px 0; color: #1e293b;">${address}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #475569;"><strong>Selected Event:</strong></td>
              <td style="padding: 4px 0; color: #1e293b;">${eventTitle || 'Lifetime Membership'}</td>
            </tr>
          </table>
        </div>

        <p style="font-size: 16px; line-height: 1.6;">
          Your registration fee of <strong>₹500</strong> covers your lifetime Green Club membership, including volunteer kits, certificates, and ID cards. 
          If you have completed your payment, your benefits will be activated shortly. If not, please complete it using the secure link provided on our platform.
        </p>

        <p style="font-size: 16px; line-height: 1.6; text-align: center; margin: 30px 0 20px 0;">
          <strong>Direct to the WhatsApp Channel:</strong><br />
          Join our official WhatsApp channel to receive real-time updates on environmental projects, local green drives, and clean-up events.
        </p>

        <div style="text-align: center; margin-bottom: 30px;">
          <a href="https://whatsapp.com/channel/0029Vb7phe1InlqH13yHXU0C" style="display: inline-block; background-color: #15803d; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 10px rgba(21, 128, 61, 0.25);">
            Join WhatsApp Channel
          </a>
        </div>

        <div style="border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center; color: #64748b; font-size: 12px;">
          <p style="margin: 0 0 5px 0;">"Join Green Club Today – Be the Change for a Cleaner Tomorrow."</p>
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} BlinKlean. All rights reserved.</p>
        </div>
      </div>
    `;

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      console.log('📧 SMTP credentials not configured. Email to ' + email + ' logged (Mock Mode):');
      console.log(`[Subject] BlinKlean Green Club – Registration Confirmation`);
      console.log(`[Details] Name: ${name}, Phone: ${phone}, Address: ${address}`);
      return {
        success: true,
        message: 'SMTP credentials not configured. Email logged successfully in console.',
        logged: true,
      };
    }

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Blinklean Green Club" <${smtpUser}>`,
        to: email,
        subject: `BlinKlean Green Club – Registration Confirmation`,
        html: htmlContent,
      });

      console.log('✅ Registration email successfully sent to ' + email);
      return { success: true, message: 'Confirmation email sent successfully.' };
    } catch (err) {
      console.error('❌ Failed to send registration email:', err);
      return {
        success: false,
        message: 'Could not deliver email: ' + (err as Error).message,
      };
    }
  }
}
