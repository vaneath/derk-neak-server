import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { Bus } from './entities/bus.entity';

@Injectable()
export class BusesService {
  constructor(
    @InjectRepository(Bus)
    private busesRepository: Repository<Bus>,
  ) {}

  async create(createBusDto: CreateBusDto): Promise<Bus> {
    const bus = this.busesRepository.create(createBusDto);
    return await this.busesRepository.save(bus);
  }

  async findAll(): Promise<Bus[]> {
    return await this.busesRepository.find();
  }

  async findOne(id: number): Promise<Bus> {
    const bus = await this.busesRepository.findOne({ where: { id } });
    if (!bus) {
      throw new NotFoundException(`Bus with ID ${id} not found`);
    }
    return bus;
  }

  async update(id: number, updateBusDto: UpdateBusDto): Promise<Bus> {
    const bus = await this.busesRepository.preload({
      id,
      ...updateBusDto,
    });
    if (!bus) {
      throw new NotFoundException(`Bus with ID ${id} not found`);
    }
    return await this.busesRepository.save(bus);
  }

  async remove(id: number): Promise<void> {
    const bus = await this.findOne(id);
    await this.busesRepository.remove(bus);
  }
}
