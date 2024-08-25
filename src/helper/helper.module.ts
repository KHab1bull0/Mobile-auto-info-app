import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { OtpService } from './otp.service';
import { HashService } from './hash.service';
import { PrismaService } from './prisma.service';

@Module({
    providers: [MailService, OtpService, HashService, PrismaService],
    exports: [MailService, OtpService, HashService, PrismaService],
})
export class HelperModule { }
