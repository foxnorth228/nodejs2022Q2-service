import { IsNotEmpty, IsString, MinLength } from "class-validator";
export class CreateUserDto {
    @IsNotEmpty({
        message: "NONONO"
    })
    @IsString()
    login: string;

    @IsNotEmpty({
        message: "NONONO"
    })
    @IsString()
    @MinLength(8)
    password: string;
}