import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './helper/prisma.service';
import { HodimModule } from './hodim/hodim.module';
import { UserModule } from './user/user.module';
import { PravaModule } from './prava/prava.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.register({
      global: true,
    }),
    AdminModule,
    HodimModule,
    UserModule,
    PravaModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
