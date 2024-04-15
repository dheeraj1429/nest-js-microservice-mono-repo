import { PAYMENT_SERVICE } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservations.repository';

@Injectable()
export class ReservationsService implements OnModuleInit {
  constructor(
    protected readonly reservationRepository: ReservationRepository,
    @Inject(PAYMENT_SERVICE) protected readonly paymentService: ClientKafka,
  ) {}

  onModuleInit() {
    this.paymentService.subscribeToResponseOf('create_charge');
  }

  async create(createReservationDto: CreateReservationDto) {
    const createChargeSubscribe = await this.paymentService
      .send('create_charge', createReservationDto.charge)
      .toPromise();
    if (createChargeSubscribe?.error) {
      return createChargeSubscribe;
    }
    return this.reservationRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId: '123',
    });
  }

  findAll() {
    return this.reservationRepository.findAll({});
  }

  findOne(_id: string) {
    return this.reservationRepository.findOne({ _id });
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate({ _id }, updateReservationDto);
  }

  remove(_id: string) {
    return this.reservationRepository.findOneAndDelete({ _id });
  }
}
