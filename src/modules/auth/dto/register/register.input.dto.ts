import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterInputDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
