import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import HttpException from '@exceptions/HttpException';
import { UserMailDto } from '@/dtos/users.dto';

class MailService {
  user: UserMailDto;
  constructor(user: UserMailDto) {
    this.user = user;
  }

  async send(subject, content, recipient, from) {
    from = from || `My APP <no-reply noreply@test.com>`;
    content = content || ' ';

    if (!recipient || recipient.length < 1) throw new HttpException(400, 'Recipient is required');
    if (!subject) throw new HttpException(400, 'Subject is required');

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '4024b919401df6',
        pass: '15af4ca851e3ec',
      },
      tls: {
        rejectUnauthorized: false,
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
    console.log(this.user.email);
    const subject = 'Email Verification';
    const content = `Hey ${this.user.name}, Please click on the link to verify your email ${link}`;
    const recipient = this.user.email;

    return await this.send(subject, content, recipient, 'Muritala David');
  }

  async sendPasswordResetMail(link) {
    const subject = 'Reset password';
    const content = `Hey ${this.user.name}, Please click on the link to reset your password ${link}`;
    const recipient = this.user.email;

    return await this.send(subject, content, recipient, 'Muritala David');
  }
}

export default MailService;
