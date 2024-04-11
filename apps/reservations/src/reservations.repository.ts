import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { Reservation } from './models/reservation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReservationRepository extends AbstractRepository<Reservation> {
  protected readonly logger = new Logger(ReservationRepository.name);

  constructor(
    @InjectModel(Reservation.name)
    protected readonly reservationModel: Model<Reservation>,
  ) {
    super(reservationModel);
  }
}
