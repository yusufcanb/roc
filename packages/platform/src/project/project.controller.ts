import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  Project,
  ProjectCreateDto,
  ProjectRepository,
  ProjectRetrieveDto,
  ProjectUpdateDto,
} from '@roc/core';
import {
  ProjectAlreadyExistsException,
  ProjectDoesNotFoundException,
} from './project.exception';

@Controller('project')
export class ProjectController {
  @Inject('ProjectRepository')
  private readonly repository: ProjectRepository;

  private readonly logger = new Logger(ProjectController.name);

  @Get()
  public async getProjects(): Promise<ProjectRetrieveDto[]> {
    return ProjectRetrieveDto.fromMany(
      await this.repository.findAll(),
    ) as ProjectRetrieveDto[];
  }

  @Post()
  public async createProject(
    @Body() dto: ProjectCreateDto,
  ): Promise<ProjectRetrieveDto> {
    if (!(await this.repository.existsById(dto.id))) {
      const project = Project.fromPlainObject(dto);
      project.createdAt = new Date();
      this.repository.save(project);
      return ProjectRetrieveDto.from(project) as ProjectRetrieveDto;
    } else {
      throw new ProjectAlreadyExistsException(dto.id);
    }
  }
}

@Controller('project/:id')
export class ProjectDetailController {
  @Inject('ProjectRepository')
  private readonly repository: ProjectRepository;
  private readonly logger = new Logger(ProjectDetailController.name);

  @Get()
  public async getProjectById(@Param('id') id): Promise<ProjectRetrieveDto> {
    if (await this.repository.existsById(id)) {
      return ProjectRetrieveDto.from(
        await this.repository.getOneById(id),
      ) as ProjectRetrieveDto;
    } else {
      throw new ProjectDoesNotFoundException();
    }
  }

  @Put()
  public async updateProjectById(
    @Param('id') id,
    @Body() dto: ProjectUpdateDto,
  ): Promise<ProjectRetrieveDto> {
    if (await this.repository.existsById(id)) {
      const project = await this.repository.getOneById(id);
      project.updatedAt = new Date(Date.now());
      project.tags = dto.tags;
      project.description = dto.description;
      this.repository.save(project);
      return ProjectRetrieveDto.from(project) as ProjectRetrieveDto;
    } else {
      throw new ProjectDoesNotFoundException();
    }
  }

  @Delete()
  public async deleteProjectById(@Param('id') id): Promise<any> {
    if (await this.repository.existsById(id)) {
      return await this.repository.deleteById(id);
    } else {
      throw new ProjectDoesNotFoundException();
    }
  }
}
