import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailService } from 'src/helper/mail.service';
import { PrismaService } from 'src/helper/prisma.service';
import { HashService } from 'src/helper/hash.service';
import { OtpService } from 'src/helper/otp.service';

@Module({
  controllers: [UserController],
  providers: [UserService, MailService, PrismaService, HashService, OtpService],
})
export class UserModule {}
