import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { SeatGenerator } from './generators/seat.generator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seat])],
  controllers: [SeatsController],
  providers: [SeatsService, SeatGenerator],
  exports: [SeatsService],
})
export class SeatsModule {}
