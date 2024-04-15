import { CreateChargeDto, NOTIFICATION_SERVICE, RpcValidationFilter } from '@app/common';
import { Controller, Inject, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: ClientKafka,
  ) {}

  @MessagePattern('create_charge')
  @UsePipes(new ValidationPipe())
  @UseFilters(new RpcValidationFilter())
  async createCharge(@Payload() payload: CreateChargeDto) {
    console.log({ payload });
    // we can write our own logic here.
    this.notificationService.emit('send_notification', { email: 'dheerajsingh1429@gmail.com' });
    return true;
  }
}
