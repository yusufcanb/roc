import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { EnvironmentCreateDto, EnvironmentRetrieveDto, Id } from '@roc/core';
import { ProjectExistsPipe } from '../project/project.pipe';
import { EnvironmentAlreadyExistsException } from './environment.exception';
import { EnvironmentService } from './environment.service';

@Controller('environment')
export class EnvironmentController {
  @Inject()
  private readonly environmentService: EnvironmentService;

  @Get()
  public async getEnvironmentsByProject(
    @Query(ProjectExistsPipe) projectId: Id,
  ): Promise<EnvironmentRetrieveDto[]> {
    return this.environmentService.findAllByProjectId(projectId);
  }

  @Post()
  public async createNewEnvironment(
    @Query(ProjectExistsPipe) projectId: Id,
    @Body() dto: EnvironmentCreateDto,
  ): Promise<EnvironmentRetrieveDto> {
    if (await this.environmentService.existsWithInProject(projectId, dto.id)) {
      throw new EnvironmentAlreadyExistsException(dto.id);
    }
    return EnvironmentRetrieveDto.from(
      await this.environmentService.createNewEnvironment(projectId, dto),
    );
  }
}
