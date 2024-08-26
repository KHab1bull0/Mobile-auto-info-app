import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupUserDto } from './dto/user.signup.dto';
import { SigninUserDto } from './dto/user.signin.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  create(@Body() signupUserDto: SignupUserDto) {
    return this.userService.create(signupUserDto);
  }

  @Post('login')
  login(@Body() signinUserDto: SigninUserDto){
    return this.userService.login(signinUserDto);
  }

  @Get('userlar')
  async findAll() {
    return await this.userService.findAll();
  }

  @Delete(':id')
    deleteUser(@Param('id') id: string){
      return this.userService.deleteUser(id);
    }
}
