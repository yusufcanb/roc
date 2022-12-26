import { Expose } from 'class-transformer';
import { IsDefined, Matches } from 'class-validator';
import { Id } from '../commons';
import { Project } from './entity';

export class ProjectRetrieveDto {
  id: Id;
  description: string;
  tags: string[];

  createdAt: Date | string;
  updatedAt: Date | string;

  static from(obj: Project): ProjectRetrieveDto {
    const dto = new ProjectRetrieveDto();
    dto.id = obj.id;
    dto.description = obj.description;
    dto.tags = obj.tags;
    dto.createdAt = obj.createdAt ? obj.createdAt : null;
    dto.updatedAt = obj.updatedAt ? obj.updatedAt : null;
    return dto;
  }

  static fromMany(obj: Project[]): ProjectRetrieveDto[] {
    const dtos: ProjectRetrieveDto[] = [];
    obj.forEach((project) => dtos.push(ProjectRetrieveDto.from(project)));
    return dtos;
  }
}

export class ProjectCreateDto {
  @IsDefined()
  @Matches(RegExp(/^[a-z0-9-]+$/))
  @Expose()
  id: Id;

  @IsDefined()
  @Expose()
  description: string;

  @IsDefined()
  @Expose()
  tags: string[];
}

export class ProjectUpdateDto {
  @IsDefined()
  @Expose()
  description: string;

  @IsDefined()
  @Expose()
  tags: string[];
}
