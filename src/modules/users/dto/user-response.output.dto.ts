import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from '../../../types/graphql';

export class UserResponseDto {
  @IsNumber()
  @IsNotEmpty()
  status: number;

  @IsString()
  @IsNotEmpty()
  data: User;
}
