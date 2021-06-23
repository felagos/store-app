import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthService } from './services/auth/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controller/auth/auth.controller';
import config from '../config';
import { ConfigType } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtKey,
          signOptions: {
            expiresIn: configService.jwtExpire
          }
        }
      }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
