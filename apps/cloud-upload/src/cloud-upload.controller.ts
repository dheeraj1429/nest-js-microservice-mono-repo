import { Controller } from '@nestjs/common';
import { CloudUploadService } from './cloud-upload.service';

@Controller()
export class CloudUploadController {
  constructor(private readonly cloudUploadService: CloudUploadService) {}
}
