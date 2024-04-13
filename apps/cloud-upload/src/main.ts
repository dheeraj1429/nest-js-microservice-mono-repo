import { NestFactory } from '@nestjs/core';
import { CloudUploadModule } from './cloud-upload.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CloudUploadModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['127.0.0.1:9092'],
      },
      consumer: {
        groupId: 'cloud-upload-consumer',
      },
    },
  });
  app.listen();
}
bootstrap();
