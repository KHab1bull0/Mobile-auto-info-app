import { Module } from '@nestjs/common';
import { JarimaService } from './jarima.service';
import { JarimaController } from './jarima.controller';
import { PrismaService } from 'src/helper/prisma.service';
import { HashService } from 'src/helper/hash.service';

@Module({
  controllers: [JarimaController],
  providers: [JarimaService, PrismaService, HashService],
})
export class JarimaModule {}
