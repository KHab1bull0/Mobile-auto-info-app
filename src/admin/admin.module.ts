import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { HelperModule } from 'src/helper/helper.module';

@Module({
  imports: [
    HelperModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
