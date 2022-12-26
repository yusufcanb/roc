import { Expose } from 'class-transformer';
import { IsDefined, Matches } from 'class-validator';
import { Id } from '../commons';
import { Project } from './entity';

export class ProjectRetrieveDto {
  id: Id;
  description: string;
  tags: string[];

  createdAt: string;
  updatedAt: string;

  public static from(
    p: Project | Project[],
  ): ProjectRetrieveDto | ProjectRetrieveDto[] {
    const toDto = (project: Project): ProjectRetrieveDto => {
      const dto = new ProjectRetrieveDto();

      dto.id = project.id;
      dto.description = project.description;
      dto.tags = project.tags;
      dto.createdAt = project.createdAt
        ? project.createdAt.toUTCString()
        : null;
      dto.updatedAt = project.updatedAt
        ? project.updatedAt.toUTCString()
        : null;
      return dto;
    };

    if (Array.isArray(p)) {
      const projectDtoList: ProjectRetrieveDto[] = [];
      p.forEach((project) => projectDtoList.push(toDto(project)));
      return projectDtoList;
    } else {
      return toDto(p);
    }
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
