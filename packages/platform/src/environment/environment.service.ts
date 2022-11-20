import { Inject, Injectable } from '@nestjs/common';
import { Environment, EnvironmentRepository } from '@roc/core';

@Injectable()
export class EnvironmentService {
  @Inject('EnvironmentRepository')
  private readonly repository: EnvironmentRepository;

  public async findAll(): Promise<Environment[]> {
    return await this.repository.findAll();
  }
}
