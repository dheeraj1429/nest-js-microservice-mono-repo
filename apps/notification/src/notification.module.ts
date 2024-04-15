import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@app/common';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationOptions: {
        NOTIFICATION_GROUP_ID: Joi.string().required(),
      },
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
