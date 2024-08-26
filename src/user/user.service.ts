import { HttpStatus, Injectable } from '@nestjs/common';
import { SignupUserDto } from './dto/user.signup.dto';
import { PrismaService } from 'src/helper/prisma.service';
import { HashService } from 'src/helper/hash.service';
import { JwtService } from '@nestjs/jwt';
import { SigninUserDto } from './dto/user.signin.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hash: HashService,
    private readonly jwtService: JwtService
  ) { }

  async create(signupUserDto: SignupUserDto) {
    try {
      const { guvohnoma_raqami, username } = signupUserDto;

      const byUsername = await this.prisma.user.findFirst({where: {username: username }})
      const prava = await this.prisma.user.findFirst({ where: { guvohnoma_raqami: guvohnoma_raqami } });

      if (prava) {
        return { message: "Bu guvohnoma raqami orqali ro'yhatdan o'tilgan", status: HttpStatus.BAD_REQUEST }
      }

      if (byUsername) {
        return { message: "Bu usernamedan ro'yhatdan o'tilgan", status: HttpStatus.BAD_REQUEST }
      }

      const guvohnoma = await this.prisma.prava.findFirst({ where: { guvohnoma_raqami: guvohnoma_raqami } });
      console.log(guvohnoma);

      if (!guvohnoma) {
        return { message: "Bunday guvohnoma_raqami mavjud emas", status: HttpStatus.BAD_REQUEST }
      }
      signupUserDto.password = await this.hash.hashPassword(signupUserDto.password)
      console.log(signupUserDto);
      
      const user = await this.prisma.user.create({
        data: signupUserDto
      });

      return { message: "User created", status: HttpStatus.OK, guvohnoma_raqami: guvohnoma.guvohnoma_raqami, role: 'user' };
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }


  async login(signinUserDto: SigninUserDto) {
    try {
      const { username, password } = signinUserDto;
      const admin = await this.validateUser(username, password);
      const token = await this.refreshTokenFunc(username, 'user');
      console.log(admin);

      if (!admin) {
        return { message: 'Bad request', status: HttpStatus.BAD_REQUEST };
      }
      if (!token) {
        return { message: 'Internal server Error', status: HttpStatus.INTERNAL_SERVER_ERROR };
      }
      const user = await this.prisma.user.findFirst({where: {username: username}});

      return { message: "Successfully logined", status: HttpStatus.OK, accessToken: token.access, guvohnoma_raqami: user.guvohnoma_raqami};


    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.user.findMany();
      return { message: "Hamma userlar", status: HttpStatus.OK, userlar: users }
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }


  async deleteUser(id: string) {
    try {

      const byId = await this.prisma.user.findFirst({ where: { id: id } });

      if (!byId) {
        return { message: "User topilmadi", status: HttpStatus.NOT_FOUND };
      }
      const user = await this.prisma.user.delete({ where: { id: id } });

      return { message: "User o'chirildi", status: HttpStatus.OK };

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }




  async refreshTokenFunc(username: string, role: string) {
    try {
      const payload = { username: username, role: role };

      const access = this.jwtService.sign(payload, { secret: process.env.ACCESS_KEY, expiresIn: process.env.ACCESS_EXPIRE_TIME })
      const refresh = this.jwtService.sign(payload, { secret: process.env.REFRESH_KEY, expiresIn: process.env.REFRESH_EXPIRE_TIME })

      const dbrefresh = await this.prisma.userRefreshTokens.findFirst({
        where: { username: username }
      });

      if (dbrefresh) {
        const updateRefresh = await this.prisma.userRefreshTokens.update({
          data: { token: refresh },
          where: { id: dbrefresh.id }
        });

      } else {
        const newRefresh = await this.prisma.userRefreshTokens.create({
          data: { username: username, token: refresh }
        });

      }
      return { access, refresh }

    } catch (e) {
      console.log(e)
      return undefined
    }
  }

  async validateUser(username: string, pass: string) {

    try {
      const user = await this.prisma.user.findFirst({ where: { username: username } });

      if (!user) {
        throw { message: `User not found`, status: HttpStatus.NOT_FOUND }
      }
      console.log(username, pass);
      console.log(user);


      if (user && (await this.hash.comparePasswords(pass, user.password))) {
        console.log(true);
        return user;
      }
    } catch (e) {
      console.log(e);
      return undefined
    }
  }
}
