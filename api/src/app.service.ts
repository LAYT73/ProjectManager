import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    constructor(private readonly mailerService: MailerService) {}

    async sendMail() {
        return await this.mailerService.sendMail({
            to: "yasughin@gmail.com",
            from: "nsshipilov@gmail.com",
            subject: 'Testing Nest MailerModule ✔', // Subject line
            text: 'welcome', // plaintext body
            html: '<b>welcome</b>', // HTML body content
        })
    }
}
