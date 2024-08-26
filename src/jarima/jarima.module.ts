import { Module } from '@nestjs/common';
import { JarimaService } from './jarima.service';
import { JarimaController } from './jarima.controller';

@Module({
  controllers: [JarimaController],
  providers: [JarimaService],
})
export class JarimaModule {}
