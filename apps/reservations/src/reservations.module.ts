import { DatabaseModule, LoggerModule, PAYMENT_SERVICE } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import { Reservation, ReservationSchema } from './models/reservation.schema';
import { ReservationsController } from './reservations.controller';
import { ReservationRepository } from './reservations.repository';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        RESERVATION_HTTP_PORT: Joi.number().required(),
        BROKER_ID_0: Joi.string().required(),
      }),
    }),
    ClientsModule.registerAsync({
      clients: [
        {
          name: PAYMENT_SERVICE,
          useFactory: (configService) => ({
            transport: Transport.KAFKA,
            options: {
              client: {
                brokers: [configService.get('BROKER_ID_0')],
              },
              consumer: {
                groupId: configService.get('PAYMENT_GROUP_ID'),
              },
            },
          }),
          inject: [ConfigService],
        },
      ],
    }),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository],
})
export class ReservationsModule {}
