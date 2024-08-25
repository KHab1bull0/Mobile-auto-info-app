import { IsString } from "class-validator";


export class CreatePravaDto {

    @IsString()
    ism: string;

    @IsString()
    familiya: string;

    @IsString()
    otasi_ismi: string;

    @IsString()
    tugilgan_yili: string;

    @IsString()
    yashash_manzili: string;

    @IsString()
    prava_olingan_sana: string;

    @IsString()
    prava_muddati: string;

    @IsString()
    berilgan_joy: string;
}



// model Prava {
//     id                 String @id @default(uuid())
//     ism                String
//     familiya           String
//     otasi_ismi         String
//     tugilgan_yili      String
//     yashash_manzili    String
//     prava_olingan_sana String
//     prava_muddati      String
//     berilgan_joy       String
//     guvohnoma_raqami   Int    @unique
  
//     @@map("prava")
//   }