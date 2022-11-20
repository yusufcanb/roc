import { BaseEntity, Id, Repository } from '@roc/core';
import { RedisClientType } from 'redis';

export abstract class AbstractRedisRepository
  implements Repository<BaseEntity>
{
  protected readonly redis: RedisClientType;

  protected readonly key: string;
  protected readonly entity: new () => BaseEntity;

  async count(): Promise<number> {
    const keys = await this.redis.keys(`${this.key}.*`);
    return keys.length;
  }

  async existsById(id: Id): Promise<boolean> {
    return Boolean(await this.redis.exists(`${this.key}.${id}`));
  }

  async getOneById<T extends BaseEntity>(id: Id): Promise<T> {
    const obj = (await this.redis.json.get(`${this.key}.${id}`)) as any;
    return this.entity['fromPlainObject'](obj);
  }

  async delete<T extends BaseEntity>(entity: T): Promise<void> {
    return this.deleteById(entity.id);
  }

  async deleteById(id: Id): Promise<void> {
    await this.redis.json.del(`${this.key}.${id}`);
  }

  deleteAll(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findAll<T extends BaseEntity>(): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  findById<T extends BaseEntity>(id: Id): Promise<T> {
    throw new Error('Method not implemented.');
  }

  async save<T extends BaseEntity>(entity: T): Promise<T> {
    await this.redis.json.set(`${this.key}.${entity.id}`, '$', entity as any);
    return entity;
  }
}
