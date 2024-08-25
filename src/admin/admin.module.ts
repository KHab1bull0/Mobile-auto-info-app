import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { HelperModule } from 'src/helper/helper.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    HelperModule,
    JwtModule
  ],
  controllers: [AdminController],
  providers: [AdminService, JwtService ],
})
export class AdminModule {}
