import { Controller, Get, Inject } from '@nestjs/common';
import { Environment } from '@roc/core';
import { EnvironmentService } from './environment.service';

@Controller('environment')
export class EnvironmentController {
  @Inject()
  private readonly environmentService: EnvironmentService;

  @Get()
  public getEnvironments(): Environment {
    try {
      this.environmentService.findAll();
    } catch (err: any) {
      return Environment.fromPlainObject({ id: 1 });
    }
  }
}
