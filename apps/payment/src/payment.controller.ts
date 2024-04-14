import { RpcValidationFilter } from '@app/common';
import { Controller, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateChargeDto } from './dto/create-charge.dto';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern('create_charge')
  @UsePipes(new ValidationPipe())
  @UseFilters(new RpcValidationFilter())
  async createCharge(@Payload() payload: CreateChargeDto) {
    console.log(payload);
    return true;
  }
}
