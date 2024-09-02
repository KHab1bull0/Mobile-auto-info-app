import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateJarimaDto } from './dto/create-jarima.dto';
import { UpdateJarimaDto } from './dto/update-jarima.dto';
import { PrismaService } from 'src/helper/prisma.service';
import { HashService } from 'src/helper/hash.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JarimaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hash: HashService,
  ) { }

  create(createJarimaDto: CreateJarimaDto) {
    return 'This action adds a new jarima';
  }

  findAll() {
    try {
      const jarimalar = this.prisma.jarima.findMany();
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} jarima`;
  }

  update(id: number, updateJarimaDto: UpdateJarimaDto) {
    return `This action updates a #${id} jarima`;
  }

  remove(id: number) {
    return `This action removes a #${id} jarima`;
  }
}
