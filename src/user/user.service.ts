import { HttpStatus, Injectable } from '@nestjs/common';
import { SignupUserDto } from './dto/signup-user.dto';
import { MailService } from 'src/helper/mail.service';
import { PrismaService } from 'src/helper/prisma.service';
import { HashService } from 'src/helper/hash.service';
import { OtpService } from 'src/helper/otp.service';

@Injectable()
export class UserService {

  constructor(
    private readonly mail: MailService,
    private readonly prisma: PrismaService,
    private readonly hash: HashService,
    private readonly otp: OtpService
  ) { }

  async signupUser(signupUserDto: SignupUserDto) {
    return this.prisma.$transaction(async (prisma) => {
      try {
        const { username } = signupUserDto;
        const user = await prisma.user.findFirst({ where: { username: username } });
        // console.log(user);

        if (user) {
          return { message: "Student already exists", status: HttpStatus.BAD_REQUEST }
        }
        // console.log(signupUserDto);

        signupUserDto.password = await this.hash.hashPassword(signupUserDto.password);

        const newUser = await prisma.user.create({
          data: signupUserDto
        });


        let checkotp = false

        // const number = this.otp.generateOtp(6)
        // await prisma.otps.create({
        //   data: { username: username, otp: number }
        // });

        // this.mail.sendMail(username, 'Otp', number)
        // checkotp = true

        delete newUser.password;
        return {
          sendOtp: checkotp,
          newStudent: newUser
        }

      } catch (e) {
        console.log(e);
        throw { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
      }
    });
  }
  
  async findAll() {
    try {
      return await this.prisma.user.findMany();
    } catch (e) {
      console.log(e);
      throw { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
