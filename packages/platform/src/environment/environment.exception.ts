import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Id } from '@roc/core';

export class EnvironmentDoesNotFoundException extends NotFoundException {
  constructor() {
    super('Environment does not exists');
  }
}

export class EnvironmentAlreadyExistsException extends BadRequestException {
  constructor(id: Id) {
    super(`Environment <${id}> already exists`);
  }
}
