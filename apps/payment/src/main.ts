import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './payment.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [configService.get('BROKER_ID_0')],
      },
      consumer: {
        groupId: configService.get('PAYMENT_GROUP_ID'),
      },
    },
  });

  app.useLogger(app.get(Logger));

  app.startAllMicroservices();
  await app.listen(configService.get('PAYMENT_HTTP_PORT'));
}
bootstrap();
