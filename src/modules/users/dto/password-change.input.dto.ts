import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordInputDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
