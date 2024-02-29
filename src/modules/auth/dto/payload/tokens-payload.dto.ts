import { IsNotEmpty, IsString } from 'class-validator';

export class TokensPayload {
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
