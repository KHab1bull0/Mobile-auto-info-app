import { IsString } from "class-validator";


enum Cars_type {
    yengil = 'yengil',
    moto = 'moto',
    yuk = 'yuk'
  }


export class CreateTexPassDto {
    
    @IsString()
    davlat_raqami: string;

    @IsString()
    model: string;

    @IsString()
    nomi: string;

    @IsString()
    turi: Cars_type;

    @IsString()
    dvigitel_raqami: string;

    @IsString()
    ot_kuchi: string;

    @IsString()
    rangi: string;

    @IsString()
    mashina_yili: string;

}

