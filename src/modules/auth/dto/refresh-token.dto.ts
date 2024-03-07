import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenInputDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
