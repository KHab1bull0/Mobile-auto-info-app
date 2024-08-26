import { Module } from '@nestjs/common';
import { TexPassService } from './tex_pass.service';
import { TexPassController } from './tex_pass.controller';
import { PrismaService } from 'src/helper/prisma.service';
import { OtpService } from 'src/helper/otp.service';
import { HashService } from 'src/helper/hash.service';
import { HelperModule } from 'src/helper/helper.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    HelperModule,
    JwtModule,
  ],
  controllers: [TexPassController],
  providers: [TexPassService, PrismaService, OtpService, HashService],
})
export class TexPassModule { }
