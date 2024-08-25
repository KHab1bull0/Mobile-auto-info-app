import { Module } from '@nestjs/common';
import { PravaService } from './prava.service';
import { PravaController } from './prava.controller';
import { PrismaService } from 'src/helper/prisma.service';
import { HashService } from 'src/helper/hash.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { HelperModule } from 'src/helper/helper.module';
import { OtpService } from 'src/helper/otp.service';

@Module({
  imports: [
    JwtModule,
    HelperModule
  ],
  controllers: [PravaController],
  providers: [PravaService, PrismaService, JwtService, OtpService],
})
export class PravaModule {}
