import { Injectable } from '@nestjs/common';
import { CreateJarimaDto } from './dto/create-jarima.dto';
import { UpdateJarimaDto } from './dto/update-jarima.dto';

@Injectable()
export class JarimaService {
  create(createJarimaDto: CreateJarimaDto) {
    return 'This action adds a new jarima';
  }

  findAll() {
    return `This action returns all jarima`;
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
