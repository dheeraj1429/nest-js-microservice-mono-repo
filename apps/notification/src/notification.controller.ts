import { Controller, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SendEmailDto } from './dto/send-email.dto';
import { RpcValidationFilter } from '@app/common';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern('send_notification')
  @UsePipes(new ValidationPipe())
  @UseFilters(new RpcValidationFilter())
  async sendEmail(@Payload() payload: SendEmailDto) {
    console.log({ payload });
    return true;
  }
}
