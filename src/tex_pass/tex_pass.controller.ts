import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TexPassService } from './tex_pass.service';
import { CreateTexPassDto } from './dto/create-tex_pass.dto';
import { UpdateTexPassDto } from './dto/update-tex_pass.dto';

@Controller('car')
export class TexPassController {
  constructor(private readonly texPassService: TexPassService) {}

  @Post('create')
  create(@Body() createTexPassDto: CreateTexPassDto) {
    return this.texPassService.create(createTexPassDto);
  }

  @Get('all')
  findAll() {
    return this.texPassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.texPassService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTexPassDto: UpdateTexPassDto) {
    return this.texPassService.update(id, updateTexPassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.texPassService.remove(id);
  }
}
