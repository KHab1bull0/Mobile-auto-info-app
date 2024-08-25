import { IsString } from "class-validator";


export class SigninAdminDto {
    
    @IsString()
    username: string;

    @IsString()
    password: string;

 }
