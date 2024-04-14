import { Module } from '@nestjs/common';
import { CloudUploadController } from './cloud-upload.controller';
import { CloudUploadService } from './cloud-upload.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@app/common';

@Module({
  imports: [ConfigModule, LoggerModule],
  controllers: [CloudUploadController],
  providers: [CloudUploadService],
})
export class CloudUploadModule {}
