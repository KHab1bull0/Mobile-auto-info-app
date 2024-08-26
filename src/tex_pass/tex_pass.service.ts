import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTexPassDto } from './dto/create-tex_pass.dto';
import { UpdateTexPassDto } from './dto/update-tex_pass.dto';
import { PrismaService } from 'src/helper/prisma.service';
import { OtpService } from 'src/helper/otp.service';

@Injectable()
export class TexPassService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly otp: OtpService
  ) { }


  async create(createTexPassDto: CreateTexPassDto) {
    try {

      const dvigitel = await this.prisma.cars.findFirst({ where: { davlat_raqami: createTexPassDto.dvigitel_raqami } });
      const car = await this.prisma.cars.findFirst({ where: { davlat_raqami: createTexPassDto.davlat_raqami } })

      if (car || dvigitel) {
        return { message: "Bunday mashina mavjud", status: HttpStatus.BAD_REQUEST }
      }

      const texpass_raqami = this.otp.generateOtp(6);
      const info = {
        ...createTexPassDto,
        texpassport_raqami: texpass_raqami
      }

      const prava = await this.prisma.cars.create({
        data: info
      });

      return { message: 'Mashina texpassporti yaratildi', status: HttpStatus.OK, yangiPrava: prava }
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async findAll() {
    try {
      const cars = await this.prisma.cars.findMany();

      return { message: "Hamma mashinalar", status: HttpStatus.OK, mashinalar: cars };

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async findOne(id: string) {
    try {
      const prava = await this.prisma.cars.findFirst({ where: { id: id } });

      if (!prava) {
        return { message: "Bunday mashina mavjud emas", status: HttpStatus.BAD_REQUEST };
      }

      return { message: 'Mashina info', status: HttpStatus.OK, prava: prava };

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async findBytexpass_id(raqami: string) {
    try {

      const prava = await this.prisma.cars.findFirst({ where: { texpassport_raqami: raqami } });
      if (!prava) {
        return { message: "Bunday Mashina mavjud emas", status: HttpStatus.BAD_REQUEST };
      }

      return { message: 'Prava', status: HttpStatus.OK, prava: prava };

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async update(id: string, updateTexPassDto: UpdateTexPassDto) {
    try {
      const carById = await this.prisma.cars.findFirst({ where: { id: id } });

      if (!carById) {
        return { message: "Bunday mashina mavjud emas", status: HttpStatus.BAD_REQUEST };
      }

      const dvigitel = await this.prisma.cars.findFirst({ where: { davlat_raqami: updateTexPassDto.dvigitel_raqami } });
      const prava = await this.prisma.cars.findFirst({ where: { davlat_raqami: updateTexPassDto.davlat_raqami } })

      if (carById || dvigitel) {
        return { message: "Bunday mashina mavjud", status: HttpStatus.BAD_REQUEST }
      }

      const info = {
        "davlat_raqami": updateTexPassDto.davlat_raqami || carById.davlat_raqami,
        "model": updateTexPassDto.model || carById.model,
        "nomi": updateTexPassDto.nomi || carById.nomi,
        "turi": updateTexPassDto.turi || carById.turi,
        "dvigitel_raqami": updateTexPassDto.dvigitel_raqami || carById.dvigitel_raqami,
        "ot_kuchi": updateTexPassDto.ot_kuchi || carById.ot_kuchi,
        "rangi": updateTexPassDto.rangi || carById.rangi,
        "mashina_yili": updateTexPassDto.mashina_yili || carById.mashina_yili,
      }
      const updatedPrava = await this.prisma.cars.update({
        data: info,
        where: { id: id }
      });

      return { message: "Mashina malumotlari yangilandi", status: HttpStatus.OK, yangilangan_prava: updatedPrava };

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async remove(id: string) {
    try {
      const car = await this.prisma.cars.findFirst({ where: { id: id } });

      if (!car) {
        return { message: "Bunday mashina mavjud emas", status: HttpStatus.BAD_REQUEST };
      }

      const deletedCar = await this.prisma.cars.delete({ where: { id: id } });

      return { message: "Mashina malumotlar o'chirildi", status: HttpStatus.OK };

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

}
