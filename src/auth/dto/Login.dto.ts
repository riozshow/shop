import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
