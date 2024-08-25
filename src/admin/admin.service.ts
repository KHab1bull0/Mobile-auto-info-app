import { HttpStatus, Injectable } from '@nestjs/common';
import { SignupAdminDto } from './dto/admin.signup';
import { PrismaService } from 'src/helper/prisma.service';
import { HashService } from 'src/helper/hash.service';
import { MailService } from 'src/helper/mail.service';
import { OtpService } from 'src/helper/otp.service';



@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hash: HashService,
    private readonly mail: MailService,
    private readonly otp: OtpService
  ) { }

  async create(signupAdminDto: SignupAdminDto) {
    try {
      const { username } = signupAdminDto;
        const user = await this.prisma.admin.findFirst({ where: { username: username } });
        console.log(user);

        if (user) {
          return { message: "Student already exists", status: HttpStatus.BAD_REQUEST }
        }
        console.log(signupAdminDto);

        signupAdminDto.password = await this.hash.hashPassword(signupAdminDto.password);

        const newUser = await this.prisma.admin.create({
          data: signupAdminDto
        });

        return {message: "Admin created", status: HttpStatus.OK}
    } catch (e) {
      console.log(e);
      throw { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  // async 
 
}
