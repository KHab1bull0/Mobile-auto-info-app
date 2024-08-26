import { IsString } from 'class-validator';
export class CreateServiceDto {
    @IsString()
    turi: string;
    @IsString()
    nomi: string;
    @IsString()
    sertificat_raqami: string;
    @IsString()
    rahbat_FISH: string;
    @IsString()
    manzili: string;
    @IsString()
    telefon_raqami: string;
}



