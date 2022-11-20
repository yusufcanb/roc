import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectRepository } from '@roc/core';
import { ProjectDoesNotFoundException } from './project.exception';

@Controller('project')
export class ProjectController {
  @Inject('ProjectRepository')
  private readonly repository: ProjectRepository;

  private readonly logger = new Logger(ProjectController.name);

  @Get()
  @HttpCode(HttpStatus.NOT_IMPLEMENTED)
  public getProjects() {
    this.logger.log('Not implemented.. ProjectController::getProjects()');
  }

  @Post()
  @HttpCode(HttpStatus.NOT_IMPLEMENTED)
  public createProject() {
    this.logger.log('Not implemented.. ProjectController::createProject()');
  }
}

@Controller('project/:id')
export class ProjectDetailController {
  @Inject('ProjectRepository')
  private readonly repository: ProjectRepository;
  private readonly logger = new Logger(ProjectDetailController.name);

  @Get()
  @HttpCode(HttpStatus.OK)
  public getProjectById(@Param('id', new ParseIntPipe()) id) {
    throw new ProjectDoesNotFoundException();
  }

  @Put()
  @HttpCode(HttpStatus.NOT_IMPLEMENTED)
  public updateProjectById(@Param('id', new ParseIntPipe()) id) {
    this.logger.log(
      'Not implemented.. ProjectDetailController::updateProjectById()',
    );
  }

  @Delete()
  @HttpCode(HttpStatus.NOT_IMPLEMENTED)
  public deleteProjectById(@Param('id', new ParseIntPipe()) id) {
    this.logger.log(
      'Not implemented.. ProjectDetailController::deleteProjectById()',
    );
  }
}
