import { BaseEntity, Id, Nullable, Repository } from '@roc/core';
import { RedisClientType } from 'redis';

export abstract class AbstractRedisRepository
  implements Repository<BaseEntity>
{
  protected readonly redis: RedisClientType;

  protected abstract readonly key: string;
  protected abstract readonly entity: new () => BaseEntity;

  protected _popFirstAndMerge(arr: string[]): string {
    if (arr.length === 0) {
      return '';
    }

    const [_, ...rest] = arr;
    return rest.join('.');
  }

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

  async deleteAll(): Promise<void> {
    const keys = await this.redis.keys(`${this.key}.*`);
    await this.redis.del(keys);
  }

  async findAll<T extends BaseEntity>(): Promise<T[]> {
    const keys = await this.redis.keys(`${this.key}.*`);
    const entityArr: T[] = [];

    for (const k of keys) {
      const entity: T = await this.getOneById<T>(
        this._popFirstAndMerge(k.split('.')),
      );
      entityArr.push(entity);
    }

    return entityArr;
  }

  async findById<T extends BaseEntity>(id: Id): Promise<Nullable<T>> {
    if (!(await this.existsById(id))) {
      return null;
    } else {
      return this.getOneById(id);
    }
  }

  async save<T extends BaseEntity>(entity: T): Promise<T> {
    await this.redis.json.set(`${this.key}.${entity.id}`, '$', entity as any);
    return entity;
  }
}
