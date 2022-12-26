import { Inject, Injectable } from '@nestjs/common';
import {
  Environment,
  EnvironmentCreateDto,
  EnvironmentRetrieveDto,
  Id,
} from '@roc/core';
import { EnvironmentRedisRepository } from './environment.repository';

@Injectable()
export class EnvironmentService {
  @Inject()
  private readonly repository: EnvironmentRedisRepository;

  public getRepository() {
    return this.repository;
  }

  public async existsWithInProject(
    projectId: Id,
    environmentId: Id,
  ): Promise<boolean> {
    return this.repository.existsById(`${projectId}.${environmentId}`);
  }

  public async findAllByProjectId(
    projectId: Id,
  ): Promise<EnvironmentRetrieveDto[]> {
    return EnvironmentRetrieveDto.fromMany(
      await this.repository.findByKey(`${projectId}.*`),
    );
  }

  public async createNewEnvironment(
    projectId: Id,
    environmentCreateDto: EnvironmentCreateDto,
  ): Promise<Environment> {
    const environment = Environment.fromPlainObject(environmentCreateDto);
    environment.projectId = projectId;
    return this.repository.save(environment);
  }
}
