import { HttpStatus, Injectable } from '@nestjs/common';
import { SignupUserDto } from './dto/user.signup.dto';
import { PrismaService } from 'src/helper/prisma.service';
import { HashService } from 'src/helper/hash.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hash: HashService,
    private readonly jwtService: JwtService
  ) { }

  async create(signupUserDto: SignupUserDto) {
    try {
      const { guvohnoma_raqami } = signupUserDto;

      const prava = await this.prisma.user.findFirst({where: {guvohnoma_raqami: guvohnoma_raqami}});
      
      if(prava){
        return {message: "Bu guvohnoma raqami orqali ro'yhatdan o'tilgan", status: HttpStatus.BAD_REQUEST}
      }

      const guvohnoma = await this.prisma.prava.findFirst({where: {guvohnoma_raqami: guvohnoma_raqami}});
      console.log(guvohnoma);
      
      if(!guvohnoma){
        return {message: "Bunday guvohnoma_raqami mavjud emas", status: HttpStatus.BAD_REQUEST}
      }

      const user = await this.prisma.user.create({
        data: signupUserDto
      });

      return {message: "User created", status: HttpStatus.OK};
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async findAll(){
    try {
      const users = await this.prisma.user.findMany();
      return {message: "Hamma userlar", status: HttpStatus.OK, userlar: users}
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }
}
