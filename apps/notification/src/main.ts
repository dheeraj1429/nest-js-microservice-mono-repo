import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [configService.get('BROKER_ID_0')],
      },
      consumer: {
        groupId: configService.get('NOTIFICATION_GROUP_ID'),
      },
    },
  });

  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
}
bootstrap();
