import { Module } from '@nestjs/common';
import { XodimService } from './xodim.service';
import { XodimController } from './xodim.controller';

@Module({
  controllers: [XodimController],
  providers: [XodimService],
})
export class XodimModule {}
