import { IsBoolean, IsOptional, IsString, isString } from "class-validator";


enum Role {
    user = 'user',
    admin = 'admin'
}

export class SignupUserDto {

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    role: Role = Role.user

    @IsString()
    @IsOptional()
    photo_url: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean = false;

    
}

