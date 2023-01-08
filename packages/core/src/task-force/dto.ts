import { Expose } from 'class-transformer';
import { IsDefined, IsOptional, Matches, IsUrl } from 'class-validator';

import { Id } from '../commons';
import { TaskForce } from './entity';

export class TaskForceRetrieveDto {
  id: Id;
  projectId: Id;

  repository: string;
  runner: string;
  selector: string;
  include: string;

  description: string;
  tags: string[];

  static from(obj: TaskForce): TaskForceRetrieveDto {
    const dto = new TaskForceRetrieveDto();

    dto.id = obj.id;
    dto.projectId = obj.projectId;

    dto.repository = obj.repository;
    dto.runner = obj.runner;
    dto.selector = obj.selector;
    dto.include = obj.include;

    dto.description = obj.description;
    dto.tags = obj.tags;

    return dto;
  }

  static fromMany(obj: TaskForce[]): TaskForceRetrieveDto[] {
    const dtos: TaskForceRetrieveDto[] = [];
    obj.forEach((env) => dtos.push(TaskForceRetrieveDto.from(env)));
    return dtos;
  }
}

export class TaskForceUpdateDto {
  @IsOptional()
  @Matches(RegExp(/^[a-z0-9-]+$/))
  @Expose()
  id: Id;

  @IsOptional()
  @Expose()
  projectId: Id;

  @IsOptional()
  @Expose()
  description: string;

  @IsOptional()
  @IsUrl()
  @Expose()
  repository: string;

  @IsOptional()
  @IsUrl()
  @Expose()
  runner: string;

  @IsOptional()
  @Expose()
  selector: string;

  @IsOptional()
  @Expose()
  include: string;

  @IsOptional()
  @Expose()
  tags: string[];
}

export class TaskForceCreateDto {
  @IsDefined()
  @Matches(RegExp(/^[a-z0-9-]+$/))
  @Expose()
  id: Id;

  @IsOptional()
  @Expose()
  description: string;

  @IsDefined()
  @IsUrl()
  @Expose()
  repository: string;

  @IsDefined()
  @IsUrl()
  @Expose()
  runner: string;

  @IsDefined()
  @Expose()
  selector: string;

  @IsOptional()
  @Expose()
  include: string;

  @IsOptional()
  @Expose()
  tags: string[];
}
