import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/helper/prisma.service';
import { OtpService } from 'src/helper/otp.service';

@Injectable()
export class ServiceService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly otp: OtpService
  ) { }

  async create(createServiceDto: CreateServiceDto) {
    try {
      const info = {
        ...createServiceDto,
      }

      const prava = await this.prisma.service.create({
        data: info
      });

      return { message: 'Service yaratildi', status: HttpStatus.OK, yangiPrava: prava }

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async findAll() {
    try {
      const pravalar = await this.prisma.service.findMany();

      return { message: "Hamma servicelar", status: HttpStatus.OK, pravalar: pravalar };
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
