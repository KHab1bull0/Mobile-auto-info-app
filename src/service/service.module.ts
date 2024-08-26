import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { PrismaService } from 'src/helper/prisma.service';
import { OtpService } from 'src/helper/otp.service';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService, PrismaService, OtpService],
})
export class ServiceModule {}
