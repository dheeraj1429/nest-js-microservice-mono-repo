import { Controller, Get } from '@nestjs/common';
import { CloudUploadService } from './cloud-upload.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class CloudUploadController {
  constructor(private readonly cloudUploadService: CloudUploadService) {}

  @MessagePattern('file-upload')
  async fileUpload(@Payload() data: any) {
    console.log(data);
  }
}
