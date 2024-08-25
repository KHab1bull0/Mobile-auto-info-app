import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { SignupAdminDto } from './dto/admin.signup';
import { SigninAdminDto } from './dto/admin.signin';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('signup')
  create(@Body() signupAdminDto: SignupAdminDto) {
    return this.adminService.create(signupAdminDto);
  }


  @Post('login')
  login(@Body() signinAdminDto: SigninAdminDto){
    return this.adminService.login(signinAdminDto)
  }

}
