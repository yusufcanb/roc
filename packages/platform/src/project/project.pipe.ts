import {
  ArgumentMetadata,
  BadRequestException,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { RedisClientType } from '@redis/client';

@Injectable()
export class ProjectExistsPipe implements PipeTransform {
  @Inject('REDIS_CLIENT')
  protected readonly redis: RedisClientType;

  async transform(value: any, metadata: ArgumentMetadata) {
    if (
      value &&
      Boolean(await this.redis.exists(`project.${value.projectId}`))
    ) {
      return value.projectId;
    } else {
      throw new BadRequestException(
        `Project <${value.projectId}> does not exist`,
      );
    }
  }
}
