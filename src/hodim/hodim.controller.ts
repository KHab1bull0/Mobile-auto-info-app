import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { HodimService } from './hodim.service';
import { SignupHodimDto } from './dto/hodim.signup';
import { SigninHodimDto } from './dto/hodim.signin';
import { UpdateHodimDto } from './dto/hodim.update';

@Controller('hodim')
export class HodimController {
  constructor(private readonly hodimService: HodimService) { }

  @Post('signup')
  create(@Body() signupAdminDto: SignupHodimDto) {
    return this.hodimService.create(signupAdminDto);
  }


  @Post('login')
  login(@Body() signinAdminDto: SigninHodimDto) {
    return this.hodimService.login(signinAdminDto)
  }

  @Get('hodimlar')
  findall() {
    return this.hodimService.allHodim();
  }

  @Get(':id')
  findone(@Param('id') id: string) {
    return this.hodimService.oneHodim(id);
  }

  @Patch(':id')
  async updateAdmin(@Param('id') id: string, @Body() updateHodimDto: UpdateHodimDto) {
    return this.hodimService.updateHodim(id, updateHodimDto);
  }

  @Delete(':id')
  async deleteAdmin(@Param('id') id: string) {
    return this.hodimService.deleteHodim(id);
  }

}
