import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { UserMailDto } from '@/dtos/users.dto';
declare class MailService {
    user: UserMailDto;
    constructor(user: UserMailDto);
    send(subject: any, content: any, recipient: any, from: any): Promise<SMTPTransport.SentMessageInfo>;
    sendEmailVerificationMail(link: any): Promise<SMTPTransport.SentMessageInfo>;
    sendPasswordResetMail(link: any): Promise<SMTPTransport.SentMessageInfo>;
}
export default MailService;
