import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { AuthPayloadDto } from './auth-payload.dto';

class LoginInputDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

class LoginResponseDto {
  @IsNumber()
  @IsNotEmpty()
  status: number;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  data: AuthPayloadDto;
}

export { LoginInputDto, LoginResponseDto };
