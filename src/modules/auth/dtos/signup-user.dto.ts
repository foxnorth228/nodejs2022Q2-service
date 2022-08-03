import { IsString, IsNotEmpty } from 'class-validator';

export class SignupUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}