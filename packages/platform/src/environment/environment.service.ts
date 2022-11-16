import { Inject, Injectable } from '@nestjs/common';
import { Environment, EnvironmentRepository } from '@roc/core';

@Injectable()
export class EnvironmentService {
  @Inject('EnvironmentRepository')
  private readonly repository: EnvironmentRepository;

  public findAll(): Environment[] {
    return this.repository.findAll();
  }
}
