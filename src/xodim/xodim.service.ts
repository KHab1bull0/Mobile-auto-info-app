import { Injectable } from '@nestjs/common';
import { CreateXodimDto } from './dto/create-xodim.dto';
import { UpdateXodimDto } from './dto/update-xodim.dto';

@Injectable()
export class XodimService {
  create(createXodimDto: CreateXodimDto) {
    return 'This action adds a new xodim';
  }

  findAll() {
    return `This action returns all xodim`;
  }

  findOne(id: number) {
    return `This action returns a #${id} xodim`;
  }

  update(id: number, updateXodimDto: UpdateXodimDto) {
    return `This action updates a #${id} xodim`;
  }

  remove(id: number) {
    return `This action removes a #${id} xodim`;
  }
}
