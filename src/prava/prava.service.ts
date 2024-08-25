import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePravaDto } from './dto/create-prava.dto';
import { UpdatePravaDto } from './dto/update-prava.dto';
import { PrismaService } from 'src/helper/prisma.service';
import { OtpService } from 'src/helper/otp.service';

@Injectable()
export class PravaService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly otp: OtpService
  ) { }

  async create(createPravaDto: CreatePravaDto) {
    try {
      const g_raqami = this.otp.generateOtp(6);

      const info = {
        ...createPravaDto,
        guvohnoma_raqami: +g_raqami
      }

      const prava = await this.prisma.prava.create({
        data: info
      });

      return { message: 'Prava yaratildi', status: HttpStatus.OK, yangiPrava: prava }

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async findAll() {
    try {
      const pravalar = await this.prisma.prava.findMany();

      return { message: "Hamma pravalar", status: HttpStatus.OK, pravalar: pravalar };
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async findOne(id: string) {
    try {
      const prava = await this.prisma.prava.findFirst({ where: { id: id } });

      if (!prava) {
        return { message: "Bunday prava mavjud emas", status: HttpStatus.BAD_REQUEST };
      }

      return { message: 'Prava', status: HttpStatus.OK, prava: prava };

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async findByPravaId(g_raqami: number) {
    try {

      const prava = await this.prisma.prava.findFirst({ where: { guvohnoma_raqami: +g_raqami } });
      if (!prava) {
        return { message: "Bunday prava mavjud emas", status: HttpStatus.BAD_REQUEST };
      }

      const jarimalar = await this.prisma.jarima.findFirst({where: {tex_pass_raqami: g_raqami}});

      return { message: 'Prava', status: HttpStatus.OK, umumiy_hujjatlar: {prava: prava, jarima: jarimalar}};

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async update(id: string, updatePravaDto: UpdatePravaDto) {
    try {
      const prava = await this.prisma.prava.findFirst({ where: { id: id } });

      if (!prava) {
        return { message: "Bunday prava mavjud emas", status: HttpStatus.BAD_REQUEST };
      }

      const info = {
        "ism": updatePravaDto.ism || prava.ism,
        "familiya": updatePravaDto.familiya || prava.familiya,
        "otasi_ismi": updatePravaDto.otasi_ismi || prava.otasi_ismi,
        "tugilgan_yili": updatePravaDto.tugilgan_yili || prava.tugilgan_yili,
        "yashash_manzili": updatePravaDto.yashash_manzili || prava.yashash_manzili,
        "prava_olingan_sana": updatePravaDto.prava_olingan_sana || prava.prava_olingan_sana,
        "prava_muddati": updatePravaDto.prava_muddati || prava.prava_muddati,
        "berilgan_joy": updatePravaDto.berilgan_joy || prava.berilgan_joy,
      }
      const updatedPrava = await this.prisma.prava.update({
        data: info,
        where: { id: id }
      });

      return { message: "Prava yangilandi", status: HttpStatus.OK, yangilangan_prava: updatedPrava };

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async remove(id: string) {
    try {
      const prava = await this.prisma.prava.findFirst({ where: { id: id } });

      if (!prava) {
        return { message: "Bunday prava mavjud emas", status: HttpStatus.BAD_REQUEST };
      }

      const deletedPrava = await this.prisma.prava.delete({ where: { id: id } });

      return { message: "Prava o'chirildi", status: HttpStatus.OK };

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }
}
