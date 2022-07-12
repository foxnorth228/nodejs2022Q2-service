import { IsNotEmpty, IsString, MinLength } from "class-validator";
export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    oldPassword: string;
    @IsNotEmpty()
    @IsString()
    newPassword: string;
}