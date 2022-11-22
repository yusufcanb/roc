import { Controller, Get, Inject } from '@nestjs/common';
import { TaskForce } from '@roc/core';
import { TaskForceService } from './task-force.service';

@Controller('task-force')
export class TaskForceController {
  @Inject()
  private readonly taskForceService: TaskForceService;

  @Get()
  public async getTaskForces(): Promise<TaskForce[]> {
    return this.taskForceService.findAll();
  }
}
