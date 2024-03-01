import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordInputDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
