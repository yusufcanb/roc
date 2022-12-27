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
  EnvironmentCreateDto,
  EnvironmentRetrieveDto,
  EnvironmentUpdateDto,
  Id,
} from '@roc/core';
import { ProjectExistsPipe } from '../project/project.pipe';
import {
  EnvironmentAlreadyExistsException,
  EnvironmentDoesNotFoundException,
} from './environment.exception';
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

@Controller('environment/:id')
export class EnvironmentDetailController {
  @Inject()
  private readonly environmentService: EnvironmentService;

  @Get()
  public async getProjectById(
    @Param('id') id,
    @Query(ProjectExistsPipe) projectId: Id,
  ): Promise<EnvironmentRetrieveDto> {
    if (await this.environmentService.existsWithInProject(projectId, id)) {
      return await this.environmentService.getEnvironmentById(projectId, id);
    } else {
      throw new EnvironmentDoesNotFoundException();
    }
  }

  @Put()
  public async updateProjectById(
    @Param('id') id,
    @Query(ProjectExistsPipe) projectId: Id,
    @Body() dto: EnvironmentUpdateDto,
  ): Promise<any> {
    if (await this.environmentService.existsWithInProject(projectId, id)) {
      const environment = await this.environmentService.updateEnviromentByIds(
        projectId,
        id,
        dto,
      );
      return EnvironmentRetrieveDto.from(environment);
    } else {
      throw new EnvironmentDoesNotFoundException();
    }
  }

  @Delete()
  public async deleteProjectById(
    @Param('id') id,
    @Query(ProjectExistsPipe) projectId: Id,
  ): Promise<any> {
    if (await this.environmentService.existsWithInProject(projectId, id)) {
      return await this.environmentService.deleteEnvironment(projectId, id);
    } else {
      throw new EnvironmentDoesNotFoundException();
    }
  }
}
