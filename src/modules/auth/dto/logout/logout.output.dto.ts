import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LogoutResponseDto {
  @IsNumber()
  @IsNotEmpty()
  status: number;

  @IsString()
  @IsNotEmpty()
  message: string;
}
