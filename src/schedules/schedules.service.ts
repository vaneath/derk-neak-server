import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { BusesService } from 'src/buses/buses.service';
import { RoutesService } from 'src/routes/routes.service';
import { validateDepartureAndReturnDateTime } from './validators/departure-return-datetime.validator';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private schedulesRepository: Repository<Schedule>,
    private busesService: BusesService,
    private routesService: RoutesService,
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const {
      busId,
      routeId,
      departureDate,
      departureTime,
      returnDate,
      returnTime,
    } = createScheduleDto;

    const [bus, route] = await Promise.all([
      this.busesService.findOne(busId),
      this.routesService.findOne(routeId),
    ]);

    if (!bus) {
      throw new BadRequestException(`Bus with ID ${busId} does not exist`);
    }

    if (!route) {
      throw new BadRequestException(`Route with ID ${routeId} does not exist`);
    }

    if (returnDate && returnTime) {
      validateDepartureAndReturnDateTime(
        departureDate,
        departureTime,
        returnDate,
        returnTime,
      );
    }

    console.log('Creating schedule...', createScheduleDto);

    const schedule = this.schedulesRepository.create({
      ...createScheduleDto,
      bus,
      route,
    });

    return await this.schedulesRepository.save(schedule);
  }

  async findAll(): Promise<Schedule[]> {
    return await this.schedulesRepository.find();
  }

  async findOne(id: number): Promise<Schedule> {
    const schedule = await this.schedulesRepository.findOneBy({ id });
    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }

    return schedule;
  }

  async update(
    id: number,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<Schedule> {
    const schedule = await this.schedulesRepository.preload({
      id,
      ...updateScheduleDto,
    });
    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }
    return await this.schedulesRepository.save(schedule);
  }

  async remove(id: number): Promise<void> {
    const schedule = await this.findOne(id);
    await this.schedulesRepository.remove(schedule);
  }
}
