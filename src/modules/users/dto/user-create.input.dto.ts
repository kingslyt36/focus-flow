import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserInputDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
