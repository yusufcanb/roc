import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  Id,
  TaskForceCreateDto,
  TaskForceRetrieveDto,
  TaskForceUpdateDto,
} from '@roc/core';
import { ProjectExistsPipe } from '../project/project.pipe';
import {
  TaskForceAlreadyExistsException,
  TaskForceDoesNotExistException,
} from './task-force.exception';
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

@Controller('task-force/:id')
export class TaskForceDetailController {
  @Inject()
  private readonly taskForceService: TaskForceService;

  @Get()
  public async getTaskForceById(
    @Param('id') id,
    @Query(ProjectExistsPipe) projectId: Id,
  ): Promise<TaskForceRetrieveDto> {
    if (await this.taskForceService.existsWithInProject(projectId, id)) {
      return await this.taskForceService.getTaskForceById(projectId, id);
    } else {
      throw new TaskForceDoesNotExistException();
    }
  }

  @Put()
  public async updateTaskForceById(
    @Param('id') id,
    @Query(ProjectExistsPipe) projectId: Id,
    @Body() dto: TaskForceUpdateDto,
  ): Promise<any> {
    if (await this.taskForceService.existsWithInProject(projectId, id)) {
      const taskForce = await this.taskForceService.updateTaskForceByIds(
        projectId,
        id,
        dto,
      );
      return TaskForceRetrieveDto.from(taskForce);
    } else {
      throw new TaskForceDoesNotExistException();
    }
  }

  @Delete()
  public async deleteProjectById(
    @Param('id') id,
    @Query(ProjectExistsPipe) projectId: Id,
  ): Promise<any> {
    if (await this.taskForceService.existsWithInProject(projectId, id)) {
      return await this.taskForceService.deleteTaskForce(projectId, id);
    } else {
      throw new TaskForceDoesNotExistException();
    }
  }
}
