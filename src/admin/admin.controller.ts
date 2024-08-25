import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { SignupAdminDto } from './dto/admin.signup';
import { SigninAdminDto } from './dto/admin.signin';

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
  findall() {
    return this.adminService.allAdmin();
  }

  @Get(':id')
  findone(@Param('id') id: string) {
    return this.adminService.oneAdmin(id);
  }

  @Patch(':id')
  async updateAdmin(@Param('id') id: string, @Body() signinAdminDto: SigninAdminDto) {
    return this.adminService.updateAdmin(id, signinAdminDto);
  }
}
