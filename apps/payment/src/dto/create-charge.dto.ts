import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateChargeDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
