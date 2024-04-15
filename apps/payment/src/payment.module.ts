import { LoggerModule, NOTIFICATION_SERVICE } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        BROKER_ID_0: Joi.string().required(),
        PAYMENT_GROUP_ID: Joi.string().required(),
      }),
    }),
    ClientsModule.registerAsync({
      clients: [
        {
          name: NOTIFICATION_SERVICE,
          useFactory: (configService: ConfigService) => ({
            transport: Transport.KAFKA,
            options: {
              client: {
                brokers: [configService.get('BROKER_ID_0')],
              },
              consumer: {
                groupId: configService.get('NOTIFICATION_GROUP_ID'),
              },
            },
          }),
          inject: [ConfigService],
        },
      ],
    }),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
