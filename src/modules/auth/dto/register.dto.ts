import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { AuthPayloadDto } from './auth-payload.dto';

class RegisterInputDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

class RegisterResponseDto {
  @IsNumber()
  @IsNotEmpty()
  status: number;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  data: AuthPayloadDto;
}

export { RegisterInputDto, RegisterResponseDto };
