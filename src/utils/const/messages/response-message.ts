import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ResponseMessage {
  @IsNumber()
  @IsNotEmpty()
  status: number;

  @IsString()
  @IsNotEmpty()
  message: string;
}
