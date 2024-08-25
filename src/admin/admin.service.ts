import { HttpStatus, Injectable } from '@nestjs/common';
import { SignupAdminDto } from './dto/admin.signup';
import { PrismaService } from 'src/helper/prisma.service';
import { HashService } from 'src/helper/hash.service';
import { MailService } from 'src/helper/mail.service';
import { OtpService } from 'src/helper/otp.service';
import { SigninAdminDto } from './dto/admin.signin';



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
        return { message: "Admin already exists", status: HttpStatus.BAD_REQUEST }
      }
      console.log(signupAdminDto);

      signupAdminDto.password = await this.hash.hashPassword(signupAdminDto.password);

      const newUser = await this.prisma.admin.create({
        data: signupAdminDto
      });

      return { message: "Admin created", status: HttpStatus.OK }
    } catch (e) {
      console.log(e);
      throw { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async login(signinAdminDto: SigninAdminDto) {
    try {

      const { username, password } = signinAdminDto;
      const admin = this.validateUser(username, password);

      return {message: "Successfully logined", status: HttpStatus.OK};
    } catch (e) {
      console.log(e);
      throw { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }



  async validateUser(username: string, pass: string) {
    const admin = await this.prisma.admin.findFirst({ where: { username: username } });
    if (!admin) {
      throw { message: `Admin not found`, status: HttpStatus.NOT_FOUND }
    }

    if (admin && (await this.hash.comparePasswords(pass, admin.password))) {
      return admin;
    }
  }

}
