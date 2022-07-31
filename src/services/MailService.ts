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
      from: env.SENDGRID_FROM,
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
}
