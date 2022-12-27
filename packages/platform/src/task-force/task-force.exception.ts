import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Id } from '@roc/core';

export class TaskForceDoesNotFoundException extends NotFoundException {
  constructor() {
    super('TaskForce does not exists');
  }
}

export class TaskForceAlreadyExistsException extends BadRequestException {
  constructor(id: Id) {
    super(`Project ${id} already exists`);
  }
}
