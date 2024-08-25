import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PravaService } from './prava.service';
import { CreatePravaDto } from './dto/create-prava.dto';
import { UpdatePravaDto } from './dto/update-prava.dto';

@Controller('prava')
export class PravaController {
  constructor(private readonly pravaService: PravaService) {}

  @Post('create')
  create(@Body() createPravaDto: CreatePravaDto) {
    return this.pravaService.create(createPravaDto);
  }

  @Get('all')
  findAll() {
    return this.pravaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pravaService.findOne(id);
  }

  @Get('gr/:guvohnoma_raqami')
  async findByPravaId(@Param('guvohnoma_raqami') g_raqami: number){
    return this.pravaService.findByPravaId(+g_raqami)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePravaDto: UpdatePravaDto) {
    return this.pravaService.update(id, updatePravaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pravaService.remove(id);
  }
}
