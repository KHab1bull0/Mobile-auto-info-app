import { IsEmail, IsString } from "class-validator";


export class SigninHodimDto {
    
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;

 }
