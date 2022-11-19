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

  existsById(id: Id): boolean {
    throw new Error('Method not implemented.');
  }
  getOneById(id: Id): Environment {
    throw new Error('Method not implemented.');
  }
  delete(entity: Environment): void {
    throw new Error('Method not implemented.');
  }
  deleteById(id: Id): void {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  findAll(): Environment[] {
    throw new Error('Method not implemented.');
  }

  findById(id: Id): Nullable<Environment> {
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
