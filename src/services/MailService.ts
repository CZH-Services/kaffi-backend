import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { env } from 'process';
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

@Injectable()
export class MailService {
  private client;

  constructor() {
    const env = process.env;
    const options = {
      host: env.SENDGRID_HOST,
      secure: true,
      port: env.SENDGRID_PORT,
      auth: {
        user: env.SENDGRID_USER,
        api_key: env.SENDGRID_API_KEY,
      },
    };
    this.client = nodemailer.createTransport(sgTransport(options));
  }

  public sendMail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: 'Kaffi-lb<' + env.SENDGRID_FROM + '>',
      to,
      subject,
      html: html,
    };
    this.client.sendMail(mailOptions, (err, info) => {
      if (err) {
        throw new HttpException(
          'Something went wrong',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
    });
  }

  public sendWelcomeOnBoardMail(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    email = email.toLowerCase();
    const env = process.env;
    const link = `<p>Dear ${firstName} ${lastName},</p>
    <p>An account in our platform have been created.</p>
    <p>Please visit <a href='${env.CLIENT_URL}/login'> this link</a> and login with the following credentials:</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Password:</b> ${password}</p>
    <br>
    <p>It is highly recommended that you change your password using the following <a href='${env.CLIENT_URL}/request-reset-password'>link</a>.</p>
    <br>
    <p>Thank you,</p>
    <p>Kaffi Team</p>
    `;
    this.sendMail(email, 'Welcome on board', link);
  }
}
