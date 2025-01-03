import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { BusesModule } from 'src/buses/buses.module';
import { RoutesModule } from 'src/routes/routes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule]), BusesModule, RoutesModule],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule {}
