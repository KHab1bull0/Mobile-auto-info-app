import { IsString } from "class-validator";


export class SigninAdminDto {
    
    @IsString()
    email: string;

    @IsString()
    password: string;

 }
