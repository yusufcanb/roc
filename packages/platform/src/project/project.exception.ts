import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Id } from '@roc/core';

export class ProjectDoesNotFoundException extends NotFoundException {
  constructor() {
    super('Project does not exists');
  }
}

export class ProjectAlreadyExistsException extends BadRequestException {
  constructor(id: Id) {
    super(`Project ${id} already exists`);
  }
}
