import { Inject, Injectable } from '@nestjs/common';
import {
  BaseEntity,
  Environment,
  EnvironmentRepository,
  Id,
  Nullable,
} from '@roc/core';
import { RedisClientType } from 'redis';

import { AbstractRedisRepository } from '../redis/redis.repository';

@Injectable()
export class JobRedisRepository
  extends AbstractRedisRepository
  implements EnvironmentRepository
{
  @Inject('REDIS_CLIENT')
  protected readonly redis: RedisClientType;

  protected key = 'environment';
  protected readonly entity: new () => Environment = Environment;

  async count(): Promise<number> {
    return super.count();
  }

  async existsById(id: Id): Promise<boolean> {
    return super.existsById(id);
  }

  async getOneById<T extends BaseEntity>(id: Id): Promise<T> {
    return super.getOneById(id);
  }

  async delete<T extends BaseEntity>(entity: T): Promise<void> {
    const environment = entity as unknown as Environment;
    return this.deleteById(`${environment.projectId}.${environment.id}`);
  }

  async deleteById(id: Id): Promise<void> {
    await this.redis.json.del(`${this.key}.${id}`);
  }

  async deleteAll(): Promise<void> {
    return super.deleteAll();
  }

  async findAll<T extends BaseEntity>(): Promise<T[]> {
    return super.findAll();
  }

  async findById<T extends BaseEntity>(id: Id): Promise<Nullable<T>> {
    return super.findById(id);
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
    if (!(entity as unknown as Environment).projectId) {
      throw new Error('Mandatory field `projectId` is not set.');
    }
    await this.redis.json.set(
      `${this.key}.${(entity as unknown as Environment).projectId}.${
        entity.id
      }`,
      '$',
      entity as any,
    );
    return entity;
  }
}
