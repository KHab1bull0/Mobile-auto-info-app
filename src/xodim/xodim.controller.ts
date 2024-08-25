import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { XodimService } from './xodim.service';
import { CreateXodimDto } from './dto/create-xodim.dto';
import { UpdateXodimDto } from './dto/update-xodim.dto';

@Controller('xodim')
export class XodimController {
  constructor(private readonly xodimService: XodimService) {}

  @Post()
  create(@Body() createXodimDto: CreateXodimDto) {
    return this.xodimService.create(createXodimDto);
  }

  @Get()
  findAll() {
    return this.xodimService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.xodimService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateXodimDto: UpdateXodimDto) {
    return this.xodimService.update(+id, updateXodimDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.xodimService.remove(+id);
  }
}
