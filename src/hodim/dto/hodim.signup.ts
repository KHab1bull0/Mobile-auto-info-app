import { IsEmail, IsString } from "class-validator";


export class SignupHodimDto {

    @IsString()
    fullname: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string
}
