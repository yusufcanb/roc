import {
  ArgumentMetadata,
  BadRequestException,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { RedisClientType } from '@redis/client';
import { Id } from '@roc/core';

@Injectable()
export class JobCreateDtoValidatorPipe implements PipeTransform {
  @Inject('REDIS_CLIENT')
  protected readonly redis: RedisClientType;

  private async taskForceExists(taskForceId: Id): Promise<boolean> {
    return Boolean(await this.redis.exists(`task-force.${taskForceId}`));
  }

  private async environmentExists(environmentId: Id): Promise<boolean> {
    return Boolean(await this.redis.exists(`environment.${environmentId}`));
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    if (!(await this.environmentExists(value.environmentId))) {
      throw new BadRequestException(
        `Environment <${value.environmentId}> does not exist`,
      );
    }

    if (!(await this.taskForceExists(value.taskForceId))) {
      throw new BadRequestException(
        `TaskForce <${value.taskForceId}> does not exist`,
      );
    }

    return value;
  }
}
