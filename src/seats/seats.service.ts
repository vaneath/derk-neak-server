/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { SeatGenerator } from './generators/seat.generator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from './entities/seat.entity';
import { Bus } from 'src/buses/entities/bus.entity';

@Injectable()
export class SeatsService {
  constructor(
    private readonly seatGenerator: SeatGenerator,
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
  ) {}

  create(createSeatDto: CreateSeatDto) {
    return 'This action adds a new seat';
  }

  async generateAndSaveSeats(
    bus: Bus,
    lowerDeckConfig: { column: string; rows: number }[],
    upperDeckConfig: { column: string; rows: number }[],
  ): Promise<Seat[]> {
    const seats = this.seatGenerator.generateSeats(
      bus,
      lowerDeckConfig,
      upperDeckConfig,
    );
    return await this.seatRepository.save(seats);
  }

  findAll() {
    return `This action returns all seats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seat`;
  }

  update(id: number, updateSeatDto: UpdateSeatDto) {
    return `This action updates a #${id} seat`;
  }

  remove(id: number) {
    return `This action removes a #${id} seat`;
  }
}
