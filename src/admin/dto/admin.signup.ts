import { IsString } from "class-validator";


export class SignupAdminDto {
    @IsString()
    username: string;

    @IsString()
    password: string
}
