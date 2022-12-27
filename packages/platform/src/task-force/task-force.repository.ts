import { Inject, Injectable } from '@nestjs/common';
import { BaseEntity, TaskForce } from '@roc/core';
import { RedisClientType } from 'redis';
import { AbstractRedisRepository } from '../redis';

@Injectable()
export class TaskForceRedisRepository extends AbstractRedisRepository {
  @Inject('REDIS_CLIENT')
  readonly redis: RedisClientType;

  protected key = 'task-force';
  protected entity = TaskForce;

  async delete<T extends BaseEntity>(entity: T): Promise<void> {
    const taskForce = entity as unknown as TaskForce;
    return this.deleteById(`${taskForce.projectId}.${taskForce.id}`);
  }

  async findByKey<T extends BaseEntity>(key: string): Promise<T[]> {
    const keys = await this.redis.keys(`${this.key}.${key}`);
    const entityArr: T[] = [];

    for (const k of keys) {
      const entity: T = await this.getOneById<T>(
        this._popFirstAndMerge(k.split('.')),
      );
      entityArr.push(entity);
    }

    return entityArr;
  }

  async save<T extends BaseEntity>(entity: T): Promise<T> {
    if (!(entity as unknown as TaskForce).projectId) {
      throw new Error('Mandatory field `projectId` is not set.');
    }
    await this.redis.json.set(
      `${this.key}.${(entity as unknown as TaskForce).projectId}.${entity.id}`,
      '$',
      entity as any,
    );
    return entity;
  }
}
