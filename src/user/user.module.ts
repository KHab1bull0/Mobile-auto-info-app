import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/helper/prisma.service';
import { HashService } from 'src/helper/hash.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { HelperModule } from 'src/helper/helper.module';

@Module({
  imports: [
    HelperModule,
    JwtModule
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService, HashService, JwtService],
})
export class UserModule {}
