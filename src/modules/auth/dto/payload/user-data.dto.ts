import { IsNotEmpty, IsString } from 'class-validator';

export class UserPayloadDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}
