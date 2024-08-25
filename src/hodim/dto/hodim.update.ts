import { IsEmail, IsOptional, IsString } from "class-validator";


export class UpdateHodimDto {
    
    @IsString()
    @IsOptional()
    fullname: string;

    @IsString()
    @IsOptional()
    password: string;

 }
