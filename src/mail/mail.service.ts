import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS, 
    },
  });

  async sendSellerCredentials(
    to: string,
    username: string,
    password: string,
  ) {
    await this.transporter.sendMail({
      from: `"Your App" <${process.env.MAIL_USER}>`,
      to,
      subject: 'Your Seller Account Created',
      html: `
        <h2>Welcome to Our Platform 🎉</h2>
        <p>Your seller account has been created.</p>

        <b>Login Credentials:</b>
        <ul>
          <li>Email: ${to}</li>
          <li>Username: ${username}</li>
          <li>Password: ${password}</li>
        </ul>

        <p>Please change your password after first login.</p>
      `,
    });
  }
}