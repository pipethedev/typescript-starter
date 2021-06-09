import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import HttpException from '@exceptions/HttpException';
import APP_NAME from './../configs';
import mailer from './../configs';
import { UserMailDto } from '@/dtos/users.dto';

class MailService {
  user: UserMailDto;
  constructor(user: UserMailDto) {
    this.user = user;
  }

  async send(subject, content, recipient, from) {
    from = from || `${APP_NAME} <no-reply${mailer.DOMAIN}>`;
    content = content || ' ';

    if (!recipient || recipient.length < 1) throw new HttpException(400, 'Recipient is required');
    if (!subject) throw new HttpException(400, 'Subject is required');

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: mailer.HOST,
      port: mailer.PORT,
      secure: mailer.SECURE,
      auth: {
        user: mailer.USER,
        pass: mailer.PASSWORD,
      },
    } as SMTPTransport.Options);

    const result = await transporter.sendMail({
      from,
      to: Array.isArray(recipient) ? recipient.join() : recipient,
      subject,
      text: content,
    });

    if (!result) throw new HttpException(500, 'Unable to send mail');

    return result;
  }

  async sendEmailVerificationMail(link) {
    const subject = 'Email Verification';
    const content = `Hey ${this.user.name}, Please click on the link to verify your email ${link}`;
    const recipient = this.user.email;

    return await this.send(subject, content, recipient, mailer.FROM);
  }

  async sendPasswordResetMail(link) {
    const subject = 'Reset password';
    const content = `Hey ${this.user.name}, Please click on the link to reset your password ${link}`;
    const recipient = this.user.email;

    return await this.send(subject, content, recipient, mailer.FROM);
  }
}

export default MailService;
