import { Expose } from 'class-transformer';
import { IsDefined, IsOptional, Matches } from 'class-validator';

/* DTO class for the all the fields that can be updated on an Environment entity */
export class EnvironmentUpdateDto {
  @IsOptional()
  @Matches(RegExp(/^[a-z0-9-]+$/))
  @Expose()
  name: string;

  @IsOptional()
  @Expose()
  description: string;

  @IsOptional()
  @Expose()
  tags: string;

  @IsOptional()
  @Expose()
  yaml: string;
}

/* DTO class for the all the required fields to create an Environment entity */
export class EnvironmentCreateDto {
  @IsDefined()
  @Matches(RegExp(/^[a-z0-9-]+$/))
  @Expose()
  name: string;

  @IsOptional()
  @Expose()
  description: string;

  @IsOptional()
  @Expose()
  tags: string;

  @IsDefined()
  @Expose()
  yaml: string;
}
