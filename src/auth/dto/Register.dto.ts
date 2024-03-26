import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { Match } from 'src/utils/match.decorator';

export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @MaxLength(30)
  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  password: string;

  @Match('password')
  passwordRepeat: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  phone?: number;

  @IsBoolean()
  @IsOptional()
  type: boolean;
}
