import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  hashedPassword: string;

  @IsPhoneNumber()
  phone?: number;

  @IsBoolean()
  @IsOptional()
  type: boolean;
}
