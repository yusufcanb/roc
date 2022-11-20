import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getHello(@Req() request: Request): Promise<string> {
    return this.appService.getHello();
  }
}
