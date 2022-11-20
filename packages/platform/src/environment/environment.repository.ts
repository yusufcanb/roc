import { Injectable, Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';

import { Environment, EnvironmentRepository, Id, Nullable } from '@roc/core';

@Injectable()
export class EnvironmentRedisRepository implements EnvironmentRepository {
  public static readonly STORE_KEY: string = 'environment';
  @Inject('REDIS_CLIENT') private readonly redis: RedisClientType;

  async count(): Promise<number> {
    const keys = await this.redis.keys(
      `${EnvironmentRedisRepository.STORE_KEY}.*`,
    );
    return keys.length;
  }

  async existsById(id: Id): Promise<boolean> {
    return Boolean(
      await this.redis.exists(`${EnvironmentRedisRepository.STORE_KEY}.${id}`),
    );
  }

  getOneById(id: Id): Promise<Environment> {
    return this.redis.json.get(
      `${EnvironmentRedisRepository.STORE_KEY}.${id}`
    ) as any;
  }

  delete(entity: Environment): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: Id): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteAll(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Environment[]> {
    throw new Error('Method not implemented.');
  }

  findById(id: Id): Promise<Nullable<Environment>> {
    throw new Error('Method not implemented.');
  }

  async save(entity: Environment): Promise<Environment> {
    await this.redis.json.set(
      `${EnvironmentRedisRepository.STORE_KEY}.${entity.id}`,
      '$',
      entity as any,
    );
    return entity;
  }
}
