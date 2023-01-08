import { NotFoundException } from '@nestjs/common';
import { Id } from '@roc/core';

export class JobDoesNotFoundException extends NotFoundException {
  constructor(id: Id) {
    super(`Job<${id}> does not exists`);
  }
}
