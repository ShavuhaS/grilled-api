import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';
import { PrismaModule } from '../../database/prisma.module';
import { ConfigurationModule } from '../../config/configuration.module';
import { SecurityConfigService } from '../../config/security-config.service';
import { EmailModule } from '../email/email.module';
import { UserMapperModule } from '../user/mappers/user-mapper.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshStrategy],
  exports: [LocalStrategy, JwtStrategy, RefreshStrategy],
  imports: [
    PrismaModule,
    ConfigurationModule,
    EmailModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [SecurityConfigService],
      useFactory: (config: SecurityConfigService) => ({
        secret: config.accessSecret,
        signOptions: {
          expiresIn: config.accessTtl as any,
        },
      }),
    }),
    UserModule,
    UserMapperModule,
  ],
})
export class AuthModule {}
