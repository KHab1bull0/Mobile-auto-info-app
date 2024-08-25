import { HttpStatus, Injectable } from '@nestjs/common';
import { SigninHodimDto } from './dto/hodim.signin';
import { PrismaService } from 'src/helper/prisma.service';
import { HashService } from 'src/helper/hash.service';
import { JwtService } from '@nestjs/jwt';
import { SignupHodimDto } from './dto/hodim.signup';
import { UpdateHodimDto } from './dto/hodim.update';


@Injectable()
export class HodimService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hash: HashService,
    private readonly jwtservice: JwtService
  ) { }


  async create(signupHodimDto: SignupHodimDto) {
    try {
      const { email } = signupHodimDto;
      const user = await this.prisma.xodim.findFirst({ where: { email: email } });

      if (user) {
        return { message: "Hodim already exists", status: HttpStatus.BAD_REQUEST }
      }

      signupHodimDto.password = await this.hash.hashPassword(signupHodimDto.password);

      const newUser = await this.prisma.xodim.create({
        data: signupHodimDto
      });

      delete newUser.password;
      return { message: "Hodim created", status: HttpStatus.OK, admin: newUser }
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }


  async login(signinHodimDto: SigninHodimDto) {
    try {
      const { email, password } = signinHodimDto;
      const hodim = await this.validateUser(email, password);
      const token = await this.refreshTokenFunc(email, 'hodim');

      if (!hodim) {
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


  async oneHodim(id: string) {
    try {

      const hodim = await this.prisma.xodim.findFirst({ where: { id: id } });

      if (!hodim) {
        return { message: "Hodim not found", status: HttpStatus.NOT_FOUND };
      }

      delete hodim.password;

      return { message: 'Bitta hodim', status: HttpStatus.OK, hodim: hodim, }
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }


  async allHodim() {
    try {
      const hodimlar = await this.prisma.xodim.findMany();

      return { message: 'Hamma hodimlar', status: HttpStatus.OK, admins: hodimlar, }
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async updateHodim(id: string, updateHodimDto: UpdateHodimDto) {
    try {


      const byId = await this.prisma.xodim.findFirst({ where: { id: id } });

      if (!byId) {
        return { message: "Hodim topilmadi", status: HttpStatus.NOT_FOUND };
      }
      if (updateHodimDto.password){
        updateHodimDto.password = await this.hash.hashPassword(updateHodimDto.password);
      }

      const info = {
        fullname: updateHodimDto.fullname || byId.fullname,
        password: updateHodimDto.password || byId.password
      }

      const updatedHodim = await this.prisma.xodim.update({
        data: info,
        where: { id: id }
      })

      return { message: "Hodim updated", status: 200 }

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }


  async deleteHodim(id: string){
    try {

      const byId = await this.prisma.xodim.findFirst({ where: { id: id } });
      
      if (!byId) {
        return { message: "Hodim topilmadi", status: HttpStatus.NOT_FOUND };
      }
      const hodim = await this.prisma.xodim.delete({where: {id: id}});

      return {message: "Hodim o'chirildi", status: HttpStatus.OK};

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

    const user = await this.prisma.xodim.findFirst({ where: { email: email } });
    if (!user) {
      throw { message: `Hodim topilmadi`, status: HttpStatus.NOT_FOUND }
    }

    if (user && (await this.hash.comparePasswords(pass, user.password))) {
      return user;
    }
    return undefined
  }
}

