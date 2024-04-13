import { Module } from '@nestjs/common';
import { CloudUploadController } from './cloud-upload.controller';
import { CloudUploadService } from './cloud-upload.service';

@Module({
  imports: [],
  controllers: [CloudUploadController],
  providers: [CloudUploadService],
})
export class CloudUploadModule {}
