import { IsString } from "class-validator";


export class SignupAdminDto {
    @IsString()
    email: string;

    @IsString()
    password: string
}
