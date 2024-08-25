import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupUserDto } from './dto/user.signup.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  create(@Body() signupUserDto: SignupUserDto) {
    return this.userService.create(signupUserDto);
  }


  @Get('userlar')
  async findAll() {
    return await this.userService.findAll();
  }
}
