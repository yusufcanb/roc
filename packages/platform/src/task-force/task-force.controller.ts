import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import {
  Id, TaskForceCreateDto,
  TaskForceRetrieveDto
} from '@roc/core';
import { ProjectExistsPipe } from '../project/project.pipe';
import { TaskForceAlreadyExistsException } from './task-force.exception';
import { TaskForceService } from './task-force.service';

@Controller('task-force')
export class TaskForceController {
  @Inject()
  private readonly taskForceService: TaskForceService;

  @Get()
  public async getTaskForces(
    @Query(ProjectExistsPipe) projectId: string,
  ): Promise<TaskForceRetrieveDto[]> {
    return TaskForceRetrieveDto.fromMany(
      await this.taskForceService.findAllByProjectId(projectId),
    );
  }

  @Post()
  public async createNewEnvironment(
    @Query(ProjectExistsPipe) projectId: Id,
    @Body() dto: TaskForceCreateDto,
  ): Promise<TaskForceRetrieveDto> {
    if (await this.taskForceService.existsWithInProject(projectId, dto.id)) {
      throw new TaskForceAlreadyExistsException(dto.id);
    }
    return TaskForceRetrieveDto.from(
      await this.taskForceService.createNewEnvironment(projectId, dto),
    );
  }
}
