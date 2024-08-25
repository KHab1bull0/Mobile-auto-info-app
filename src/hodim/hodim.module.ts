import { Module } from '@nestjs/common';
import { HodimService } from './hodim.service';
import { HodimController } from './hodim.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { HelperModule } from 'src/helper/helper.module';

@Module({
  imports: [
    HelperModule,
    JwtModule
  ],
  controllers: [HodimController],
  providers: [HodimService, JwtService],
})
export class HodimModule {}
