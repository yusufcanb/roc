import { Expose } from 'class-transformer';
import { IsDefined, IsOptional, Matches, IsUrl } from 'class-validator';

export class TaskForceCreateDto {
  @IsDefined()
  @Matches(RegExp(/^[a-z0-9-]+$/))
  @Expose()
  name: string;

  @IsDefined()
  @Expose()
  projectId: string;

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

  @IsOptional()
  @Expose()
  selector: string;

  @IsOptional()
  @Expose()
  include: string;

  @IsOptional()
  @Expose()
  tags: string;
}

export class TaskForceUpdateDto {
  @IsOptional()
  @Matches(RegExp(/^[a-z0-9-]+$/))
  @Expose()
  name: string;

  @IsOptional()
  @Expose()
  projectId: string;

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
  tags: string;
}
