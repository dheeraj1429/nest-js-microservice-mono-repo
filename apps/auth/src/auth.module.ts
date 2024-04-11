import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { JwtGuard, JwtModule, LoggerModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { JwtService } from '@app/common/jwt/jwt.service';

@Module({
  imports: [
    UserModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
      }),
    }),
  ],
  providers: [],
})
export class AuthModule {}
