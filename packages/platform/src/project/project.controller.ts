import {
  Body,
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
import { Project, ProjectCreateDto, ProjectRepository } from '@roc/core';
import { ProjectDoesNotFoundException } from './project.exception';

@Controller('project')
export class ProjectController {
  @Inject('ProjectRepository')
  private readonly repository: ProjectRepository;

  private readonly logger = new Logger(ProjectController.name);

  @Get()
  public getProjects() {
    return this.repository.findAll();
  }

  @Post()
  public createProject(@Body() dto: ProjectCreateDto) {
    const project = Project.fromPlainObject(dto);
    this.repository.save(project);

    return project;
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
