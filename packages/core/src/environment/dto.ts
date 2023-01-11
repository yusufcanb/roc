import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsObject,
  IsOptional,
  Matches,
} from 'class-validator';
import { Id } from '../commons';
import { Environment } from './entity';

export class EnvironmentRetrieveDto {
  id: Id;
  projectId: Id;
  description: string;
  tags: string[];
  variables: object;

  static from(obj: Environment): EnvironmentRetrieveDto {
    const dto = new EnvironmentRetrieveDto();

    dto.id = obj.id;
    dto.projectId = obj.projectId;
    dto.description = obj.description;
    dto.tags = obj.tags;
    dto.variables = obj.variables;

    return dto;
  }

  static fromMany(obj: Environment[]): EnvironmentRetrieveDto[] {
    const dtos: EnvironmentRetrieveDto[] = [];
    obj.forEach((env) => dtos.push(EnvironmentRetrieveDto.from(env)));
    return dtos;
  }
}

/* DTO class for the all the fields that can be updated on an Environment entity */
export class EnvironmentUpdateDto {
  @IsOptional()
  @Expose()
  description: string;

  @IsOptional()
  @Expose()
  tags: string[];

  @IsOptional()
  @Expose()
  @Type(() => Object)
  variables: object;
}

/* DTO class for the all the required fields to create an Environment entity */
export class EnvironmentCreateDto {
  @IsDefined()
  @Matches(RegExp(/^[a-z0-9-]+$/))
  @Expose()
  id: string;

  @IsOptional()
  @Expose()
  description: string;

  @IsOptional()
  @IsArray()
  @Expose()
  tags: string[];

  @IsDefined()
  @IsObject()
  @Expose()
  variables: object;
}
