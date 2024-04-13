import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule } from '@app/common';
import { ReservationRepository } from './reservations.repository';
import { Reservation, ReservationSchema } from './models/reservation.schema';
import { LoggerModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CLOUD_UPLOAD_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'cloud-upload',
            brokers: ['127.0.0.1:9092'],
          },
          consumer: {
            groupId: 'cloud-upload-consumer',
          },
        },
      },
    ]),
    DatabaseModule,
    DatabaseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        RESERVATION_HTTP_PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository],
})
export class ReservationsModule {}
