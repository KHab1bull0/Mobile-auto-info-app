import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { SignupAdminDto } from './dto/admin.signup';
import { SigninAdminDto } from './dto/admin.signin';
import { JwtAuthGuard } from 'src/common/guards';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/types/role.enum';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('signup')
  create(@Body() signupAdminDto: SignupAdminDto) {
    return this.adminService.create(signupAdminDto);
  }


  @Post('login')
  login(@Body() signinAdminDto: SigninAdminDto) {
    return this.adminService.login(signinAdminDto)
  }

  @Get('adminlar')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  findall() {
    return this.adminService.allAdmin();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  findone(@Param('id') id: string) {
    return this.adminService.oneAdmin(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  async updateAdmin(@Param('id') id: string, @Body() signinAdminDto: SigninAdminDto) {
    return this.adminService.updateAdmin(id, signinAdminDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin)
  async deleteAdmin(@Param('id') id: string){
    return this.adminService.deleteAdmin(id);
  }
}
