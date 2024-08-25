import { IsNumber, IsString } from "class-validator";


export class SignupUserDto{

    @IsString()
    firstname: string;
    @IsString()
    lastname: string;
    @IsNumber()
    guvohnoma_raqami: number;
    @IsString()
    password: string;
}