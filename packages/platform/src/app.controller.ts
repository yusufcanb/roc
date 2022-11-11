import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  private static TEST_KEY = 'test_node';

  constructor(private readonly appService: AppService) { }

  @Get()
  async getHello(@Req() request: Request): Promise<string> {
    return this.appService.getHello();
  }
}
