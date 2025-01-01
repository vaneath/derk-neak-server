import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Route } from './entities/route.entity';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
    private routesRepository: Repository<Route>,
  ) {}

  async create(createRouteDto: CreateRouteDto): Promise<Route> {
    const route = this.routesRepository.create(createRouteDto);
    return await this.routesRepository.save(route);
  }

  async findAll(): Promise<Route[]> {
    return await this.routesRepository.find();
  }

  async findOne(id: number): Promise<Route> {
    const route = await this.routesRepository.findOne({ where: { id } });
    if (!route) {
      throw new NotFoundException(`Route with ID ${id} not found`);
    }
    return route;
  }

  async update(id: number, updateRouteDto: UpdateRouteDto): Promise<Route> {
    const route = await this.routesRepository.preload({
      id,
      ...updateRouteDto,
    });
    if (!route) {
      throw new NotFoundException(`Route with ID ${id} not found`);
    }
    return await this.routesRepository.save(route);
  }

  async remove(id: number): Promise<void> {
    const route = await this.findOne(id);
    await this.routesRepository.remove(route);
  }
}
