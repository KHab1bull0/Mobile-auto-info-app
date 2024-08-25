import { IsOptional, IsString } from "class-validator";


export class UpdateAdminDto {
    
    @IsString()
    @IsOptional()
    password: string;

 }
