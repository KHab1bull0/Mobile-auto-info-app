import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { HodimService } from './hodim.service';
import { SignupHodimDto } from './dto/hodim.signup';
import { SigninHodimDto } from './dto/hodim.signin';
import { UpdateHodimDto } from './dto/hodim.update';
import { JwtAuthGuard } from 'src/common/guards';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Role } from 'src/common/types/role.enum';
import { Roles } from 'src/common/decorators/role.decorator';

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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  findall() {
    return this.hodimService.allHodim();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  findone(@Param('id') id: string) {
    return this.hodimService.oneHodim(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  async updateAdmin(@Param('id') id: string, @Body() updateHodimDto: UpdateHodimDto) {
    return this.hodimService.updateHodim(id, updateHodimDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  async deleteAdmin(@Param('id') id: string) {
    return this.hodimService.deleteHodim(id);
  }

}
