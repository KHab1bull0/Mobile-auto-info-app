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
      const texpass = await this.prisma.cars.findMany();
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} texPass`;
  }

  update(id: number, updateTexPassDto: UpdateTexPassDto) {
    return `This action updates a #${id} texPass`;
  }

  remove(id: number) {
    return `This action removes a #${id} texPass`;
  }
}
