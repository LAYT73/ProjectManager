import { Controller, Get, Delete, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async sendMail() {
    return await this.appService.sendMail();
  }
}
