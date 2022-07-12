import { IsNotEmpty, IsString, MinLength } from "class-validator";
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    login: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}