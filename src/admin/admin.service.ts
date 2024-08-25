import { HttpStatus, Injectable } from '@nestjs/common';
import { SignupAdminDto } from './dto/admin.signup';
import { PrismaService } from 'src/helper/prisma.service';
import { HashService } from 'src/helper/hash.service';
import { JwtService } from '@nestjs/jwt';
import { SigninAdminDto } from './dto/admin.signin';
import { UpdateAdminDto } from './dto/admin.update';



@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hash: HashService,
    private readonly jwtservice: JwtService
  ) { }

  async create(signupAdminDto: SignupAdminDto) {
    try {
      const { email } = signupAdminDto;
      const user = await this.prisma.admin.findFirst({ where: { email: email } });

      if (user) {
        return { message: "Admin already exists", status: HttpStatus.BAD_REQUEST }
      }

      signupAdminDto.password = await this.hash.hashPassword(signupAdminDto.password);

      const newUser = await this.prisma.admin.create({
        data: signupAdminDto
      });
      delete newUser.password;
      return { message: "Admin created", status: HttpStatus.OK, admin: newUser }
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async login(signinAdminDto: SigninAdminDto) {
    try {
      const { email, password } = signinAdminDto;
      const admin = await this.validateUser(email, password);
      const token = await this.refreshTokenFunc(email, 'admin');

      if (!admin) {
        return { message: 'Bad request', status: HttpStatus.BAD_REQUEST };
      }
      if (!token) {
        return { message: 'Internal server Error', status: HttpStatus.INTERNAL_SERVER_ERROR };
      }

      return { message: "Successfully logined", status: HttpStatus.OK, accessToken: token.access };

    } catch (e) {
      console.log(e);
      return { error: e, status: e.status || HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async oneAdmin(id: string) {
    try {

      const admin = await this.prisma.admin.findFirst({ where: { id: id } });

      if (!admin) {
        return { message: "Admin not found", status: HttpStatus.NOT_FOUND };
      }

      return { message: 'Bitta admin', status: HttpStatus.OK, admin: admin, }
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async allAdmin() {
    try {
      const admins = await this.prisma.admin.findMany();

      return { message: 'Hamma adminlar', status: HttpStatus.OK, admins: admins, }
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async updateAdmin(id: string, updateAdminDto: UpdateAdminDto) {
    try {
      
      const byId = await this.prisma.admin.findFirst({ where: { id: id } });
      
      if (!byId) {
        return { message: "Admin topilmadi", status: HttpStatus.NOT_FOUND };
      }

      updateAdminDto.password = await this.hash.hashPassword(updateAdminDto.password)

      const info = {
        password: updateAdminDto.password
      }

      const updatedAdmin = await this.prisma.admin.update({
        data: info,
        where: { id: id }
      })

      return { message: "Admin updated", status: 200, }

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }


  async deleteAdmin(id: string){
    try {

      const byId = await this.prisma.admin.findFirst({ where: { id: id } });
      
      if (!byId) {
        return { message: "Admin topilmadi", status: HttpStatus.NOT_FOUND };
      }
      const admin = await this.prisma.admin.delete({where: {id: id}});

      return {message: "Admin o'chirildi", status: HttpStatus.OK};

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }


  async refreshTokenFunc(email: string, role: string) {
    try {
      const payload = { email: email, role: role };

      const access = this.jwtservice.sign(payload, { secret: process.env.ACCESS_KEY, expiresIn: process.env.ACCESS_EXPIRE_TIME })
      const refresh = this.jwtservice.sign(payload, { secret: process.env.REFRESH_KEY, expiresIn: process.env.REFRESH_EXPIRE_TIME })

      const dbrefresh = await this.prisma.refreshTokens.findFirst({
        where: { email: email }
      });

      if (dbrefresh) {
        const updateRefresh = await this.prisma.refreshTokens.update({
          data: { token: refresh },
          where: { id: dbrefresh.id }
        });

      } else {
        const newRefresh = await this.prisma.refreshTokens.create({
          data: { email: email, token: refresh }
        });

      }
      return { access, refresh }

    } catch (e) {
      console.log(e)
      return undefined
    }
  }

  async validateUser(email: string, pass: string) {

    const admin = await this.prisma.admin.findFirst({ where: { email: email } });

    console.log(admin);
    
    if (!admin) {
      throw { message: `Admin not found`, status: HttpStatus.NOT_FOUND }
    }

    if (admin && (await this.hash.comparePasswords(pass, admin.password))) {
      return admin;
    }
  }

}
