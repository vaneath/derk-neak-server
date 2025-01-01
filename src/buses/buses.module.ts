import { Module } from '@nestjs/common';
import { BusesService } from './buses.service';
import { BusesController } from './buses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bus } from './entities/bus.entity';
import { Seat } from 'src/seats/entities/seat.entity';
import { SeatsService } from 'src/seats/seats.service';
import { SeatsModule } from 'src/seats/seats.module';
import { SeatGenerator } from 'src/seats/generators/seat.generator';

@Module({
  imports: [TypeOrmModule.forFeature([Bus]), SeatsModule],
  controllers: [BusesController],
  providers: [BusesService],
  exports: [BusesService],
})
export class BusesModule {}
