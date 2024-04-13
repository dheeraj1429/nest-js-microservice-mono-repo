import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservations.repository';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ReservationsService {
  constructor(
    @Inject('CLOUD_UPLOAD_SERVICE') protected readonly cloudUploadService: ClientKafka,
    protected readonly reservationRepository: ReservationRepository,
  ) {}

  create(createReservationDto: CreateReservationDto) {
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

  async fileUpload() {
    this.cloudUploadService.emit('file-upload', { file: 'demo file data' });
    console.log('this is the file upload function called');
  }
}
