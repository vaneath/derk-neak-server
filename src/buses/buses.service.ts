import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { Bus } from './entities/bus.entity';
import { SeatsService } from 'src/seats/seats.service';

@Injectable()
export class BusesService {
  constructor(
    @InjectRepository(Bus)
    private busRepository: Repository<Bus>,
    private readonly seatsService: SeatsService,
  ) {}

  async create(createBusDto: CreateBusDto): Promise<Bus> {
    const { lowerDeckConfig, upperDeckConfig, ...busData } = createBusDto;

    // Calculate total seats
    const totalSeats =
      lowerDeckConfig.reduce((sum, config) => sum + config.rows, 0) +
      upperDeckConfig.reduce((sum, config) => sum + config.rows, 0);

    if (totalSeats !== createBusDto.capacity) {
      throw new BadRequestException(
        'The total number of seats does not match the bus capacity.',
      );
    }

    // Save Bus
    const bus = this.busRepository.create(busData);
    const savedBus = await this.busRepository.save(bus);

    // Delegate seat generation to SeatsService
    await this.seatsService.generateAndSaveSeats(
      { id: savedBus.id } as Bus,
      lowerDeckConfig,
      upperDeckConfig,
    );

    return savedBus;
  }

  async findAll(): Promise<Bus[]> {
    return await this.busRepository.find();
  }

  async findOne(id: number): Promise<Bus> {
    const bus = await this.busRepository.findOne({
      where: { id },
      relations: {
        seats: true,
      },
    });
    if (!bus) {
      throw new NotFoundException(`Bus with ID ${id} not found`);
    }
    return bus;
  }

  async update(id: number, updateBusDto: UpdateBusDto): Promise<Bus> {
    const bus = await this.busRepository.preload({
      id,
      ...updateBusDto,
    });
    if (!bus) {
      throw new NotFoundException(`Bus with ID ${id} not found`);
    }
    return await this.busRepository.save(bus);
  }

  async remove(id: number): Promise<void> {
    const bus = await this.findOne(id);
    await this.busRepository.remove(bus);
  }
}
