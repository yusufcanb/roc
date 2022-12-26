import { Inject, Injectable } from '@nestjs/common';
import { EnvironmentUpdateDto } from '@roc/core';
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

  public async getEnvironmentById(
    projectId: Id,
    id: Id,
  ): Promise<EnvironmentRetrieveDto> {
    return EnvironmentRetrieveDto.from(
      await this.repository.getOneById(`${projectId}.${id}`),
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

  public async deleteEnvironment(projectId: Id, id: Id) {
    return this.repository.deleteById(`${projectId}.${id}`);
  }

  public async updateEnviromentByIds(
    projectId: Id,
    environmentId: Id,
    dto: EnvironmentUpdateDto,
  ) {
    const env = (await this.repository.getOneById(
      `${projectId}.${environmentId}`,
    )) as Environment;

    env.description = dto.description;
    env.tags = dto.tags;
    env.variables = dto.variables;

    this.repository.save(env);
    return env;
  }
}
