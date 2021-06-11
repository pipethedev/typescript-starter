'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const nodemailer_1 = tslib_1.__importDefault(require('nodemailer'));
const HttpException_1 = tslib_1.__importDefault(require('../exceptions/HttpException'));
const configs_1 = tslib_1.__importDefault(require('./../configs'));
const configs_2 = tslib_1.__importDefault(require('./../configs'));
class MailService {
  constructor(user) {
    this.user = user;
  }
  async send(subject, content, recipient, from) {
    from = from || `${configs_1.default} <no-reply${configs_2.default.DOMAIN}>`;
    content = content || ' ';
    if (!recipient || recipient.length < 1) throw new HttpException_1.default(400, 'Recipient is required');
    if (!subject) throw new HttpException_1.default(400, 'Subject is required');
    // Nodemailer transporter
    const transporter = nodemailer_1.default.createTransport({
      host: configs_2.default.HOST,
      port: configs_2.default.PORT,
      secure: configs_2.default.SECURE,
      auth: {
        user: configs_2.default.USER,
        pass: configs_2.default.PASSWORD,
      },
    });
    const result = await transporter.sendMail({
      from,
      to: Array.isArray(recipient) ? recipient.join() : recipient,
      subject,
      text: content,
    });
    if (!result) throw new HttpException_1.default(500, 'Unable to send mail');
    return result;
  }
  async sendEmailVerificationMail(link) {
    const subject = 'Email Verification';
    const content = `Hey ${this.user.name}, Please click on the link to verify your email ${link}`;
    const recipient = this.user.email;
    return await this.send(subject, content, recipient, configs_2.default.FROM);
  }
  async sendPasswordResetMail(link) {
    const subject = 'Reset password';
    const content = `Hey ${this.user.name}, Please click on the link to reset your password ${link}`;
    const recipient = this.user.email;
    return await this.send(subject, content, recipient, configs_2.default.FROM);
  }
}
exports.default = MailService;
//# sourceMappingURL=mail.service.js.map
