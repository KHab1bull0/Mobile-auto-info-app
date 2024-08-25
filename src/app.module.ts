import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { XodimModule } from './xodim/xodim.module';
import { JwtModule } from '@nestjs/jwt'


@Module({
  imports: [

    JwtModule.register({
      global: true,
    }),
    
    AdminModule,
    XodimModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
