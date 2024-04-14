import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { CLOUD_UPLOAD_SERVICE, DatabaseModule } from '@app/common';
import { ReservationRepository } from './reservations.repository';
import { Reservation, ReservationSchema } from './models/reservation.schema';
import { LoggerModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
        RESERVATION_GROUP_ID: Joi.string().required(),
        RESERVATION_BROKER_ID: Joi.string().required(),
        CLOUD_UPLOAD_CLIENT_ID: Joi.string().required(),
        CLOUD_UPLOAD_GROUP_ID: Joi.string().required(),
      }),
    }),
    ClientsModule.registerAsync({
      clients: [
        {
          name: CLOUD_UPLOAD_SERVICE,
          useFactory: (configService: ConfigService) => ({
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: configService.get('CLOUD_UPLOAD_CLIENT_ID'),
                brokers: [configService.get('RESERVATION_BROKER_ID')],
              },
              consumer: {
                groupId: configService.get('CLOUD_UPLOAD_GROUP_ID'),
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
