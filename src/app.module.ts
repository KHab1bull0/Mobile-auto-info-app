import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './helper/prisma.service';
import { HodimModule } from './hodim/hodim.module';
import { UserModule } from './user/user.module';
import { PravaModule } from './prava/prava.module';
import { TexPassModule } from './tex_pass/tex_pass.module';
import { JarimaModule } from './jarima/jarima.module';
import { AccessTokenStrategy } from './common/strategies';
import { PassportModule } from '@nestjs/passport';
import { ServiceModule } from './service/service.module';


@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true
    }),

    JwtModule.register({
      global: true,
    }),

    PassportModule,
    AdminModule,
    HodimModule,
    UserModule,
    PravaModule,
    TexPassModule,
    JarimaModule,
    ServiceModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    AccessTokenStrategy
  ],
})
export class AppModule { }
