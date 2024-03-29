import { BaseEntity } from './entity';
import { Id, Nullable } from './types';

export interface Repository<T extends BaseEntity> {
  /**
   * Returns the number of entities available.
   * @returns the number of entities.
   */
  count(): Promise<number>;

  /**
   * Returns whether an entity with the given id exists.
   * @param id The entity
   * @returns true if an entity with the given id exists, false otherwise.
   */
  existsById(id: Id): Promise<boolean>;

  /**
   * Retrieve an Entity by its identifier
   * @param id Entity identifier
   */
  getOneById(id: Id): Promise<T>;

  /**
   * Deletes a given entity.
   * @param id Entity identifier
   */
  delete(entity: T): Promise<void>;

  /**
   * Deletes the entity with the given id.
   * If the entity is not found in the persistence store it is silently ignored.
   * @param id The entity
   */
  deleteById(id: Id): Promise<void>;

  /**
   * Deletes all entities managed by the repository.
   * @param id Entity identifier
   */
  deleteAll(): Promise<void>;

  /**
   * Returns all instances of the type.
   * @returns All entities
   */
  findAll(): Promise<T[]>;

  /**
   * Retrieves an entity by its id.
   * @param id Entity identifier
   * @returns the entity with the given id or null if none found.
   */
  findById(id: Id): Promise<Nullable<T>>;

  /**
   * Saves a given entity.
   * @param entity Entity to be saved
   * @returns The saved entity, will never be null.
   */
  save(entity: T): Promise<T>;
}
