import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AuthPayloadDto } from '../payload/auth-payload.dto';

export class RegisterResponseDto {
  @IsNumber()
  @IsNotEmpty()
  status: number;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  data: AuthPayloadDto;
}
