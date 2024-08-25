import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { SignupAdminDto } from './dto/admin.signup';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('sidnup')
  create(@Body() signupAdminDto: SignupAdminDto) {
    return this.adminService.create(signupAdminDto);
  }

}
