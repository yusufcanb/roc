import { Expose, Type } from 'class-transformer';
import { IsDefined, IsOptional, Matches } from 'class-validator';
import { Id } from '../commons';
import { Job } from './entity';

export class JobRetrieveDto {
  id: Id;
  projectId: Id;
  taskForceId: Id;
  environmentId: Id;

  static from(obj: Job): JobRetrieveDto {
    const dto = new JobRetrieveDto();

    return dto;
  }

  static fromMany(obj: Job[]): JobRetrieveDto[] {
    const dtos: JobRetrieveDto[] = [];
    obj.forEach((env) => dtos.push(JobRetrieveDto.from(env)));
    return dtos;
  }
}

/* DTO class for the all the fields that can be updated on an Job entity */
export class JobUpdateDto {
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

/* DTO class for the all the required fields to create an Job entity */
export class JobCreateDto {
  @IsDefined()
  @Matches(RegExp(/^[a-z0-9-]+$/))
  @Expose()
  taskForceId: string;

  @IsDefined()
  @Matches(RegExp(/^[a-z0-9-]+$/))
  @Expose()
  environmentId: string;
}
