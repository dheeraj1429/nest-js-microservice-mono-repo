import { NestFactory } from '@nestjs/core';
import { CloudUploadModule } from './cloud-upload.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(CloudUploadModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [configService.get('CLOUD_UPLOAD_BROKER_ID')],
      },
      consumer: {
        groupId: configService.get('CLOUD_UPLOAD_GROUP_ID'),
      },
    },
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));

  await app.startAllMicroservices();
  await app.listen(configService.get('CLOUD_UPLOAD_HTTP_PORT'));
}
bootstrap();
