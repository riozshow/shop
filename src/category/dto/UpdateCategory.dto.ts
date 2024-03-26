import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCategoryDTO {
  @MaxLength(191)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  defaultImage?: string;
}
