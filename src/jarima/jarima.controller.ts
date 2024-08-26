import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JarimaService } from './jarima.service';
import { CreateJarimaDto } from './dto/create-jarima.dto';
import { UpdateJarimaDto } from './dto/update-jarima.dto';
import { RolesGuard } from 'src/common/guards/role.guard';
import { JwtAuthGuard } from 'src/common/guards';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/types/role.enum';

@Controller('jarima')
export class JarimaController {
  constructor(private readonly jarimaService: JarimaService) {}

  @Post()
  create(@Body() createJarimaDto: CreateJarimaDto) {
    return this.jarimaService.create(createJarimaDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  findAll() {
    return this.jarimaService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  findOne(@Param('id') id: string) {
    return this.jarimaService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  update(@Param('id') id: string, @Body() updateJarimaDto: UpdateJarimaDto) {
    return this.jarimaService.update(+id, updateJarimaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  remove(@Param('id') id: string) {
    return this.jarimaService.remove(+id);
  }
}
