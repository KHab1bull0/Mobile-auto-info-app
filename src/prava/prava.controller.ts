import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PravaService } from './prava.service';
import { CreatePravaDto } from './dto/create-prava.dto';
import { UpdatePravaDto } from './dto/update-prava.dto';
import { JwtAuthGuard } from 'src/common/guards';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Role } from 'src/common/types/role.enum';
import { Roles } from 'src/common/decorators/role.decorator';

@Controller('prava')
export class PravaController {
  constructor(private readonly pravaService: PravaService) {}

  @Post('create')
  create(@Body() createPravaDto: CreatePravaDto) {
    return this.pravaService.create(createPravaDto);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  findAll() {
    return this.pravaService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  findOne(@Param('id') id: string) {
    return this.pravaService.findOne(id);
  }

  @Get('gr/:guvohnoma_raqami')
  async findByPravaId(@Param('guvohnoma_raqami') g_raqami: number){
    return this.pravaService.findByPravaId(+g_raqami)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  update(@Param('id') id: string, @Body() updatePravaDto: UpdatePravaDto) {
    return this.pravaService.update(id, updatePravaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  remove(@Param('id') id: string) {
    return this.pravaService.remove(id);
  }
}
