import { IsNotEmpty } from 'class-validator';
import { UserPayloadDto } from './user-data.dto';

export class AuthPayloadDto {
  @IsNotEmpty()
  user: UserPayloadDto;
}
