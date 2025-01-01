import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { BusesService } from 'src/buses/buses.service';
import { RoutesService } from 'src/routes/routes.service';
import { Bus } from 'src/buses/entities/bus.entity';
import { Route } from 'src/routes/entities/route.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Bus, Route])],
  controllers: [SchedulesController],
  providers: [SchedulesService, BusesService, RoutesService],
})
export class SchedulesModule {}
