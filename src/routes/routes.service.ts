// import { Injectable } from '@nestjs/common';
// import { CreateRouteDto } from './dto/create-route.dto';
// import { UpdateRouteDto } from './dto/update-route.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Route } from './entities/route.entity';

import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Route } from "./entities/route.entity";
//import { Routes } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRouteDto } from "./dto/createRoute.dto";
import { retry } from "rxjs";
import { UpdateRouteDto } from "./dto/updateRoute.dto";


// @Injectable()
// export class RoutesService {
//   constructor(
//     @InjectRepository(Route)
//     private readonly routeRepository: Repository<Route>,
//   ) {}

//   create(createRouteDto: CreateRouteDto): Promise<Route> {
//     const route = this.routeRepository.create(createRouteDto);
//     return this.routeRepository.save(route);
//   }

//   findAll(): Promise<Route[]> {
//     return this.routeRepository.find();
//   }

//   findOne(id: number): Promise<Route> {
//     return this.routeRepository.findOne({ where: { route_id: id } });
//   }

//   async update(id: number, updateRouteDto: UpdateRouteDto): Promise<Route> {
//     await this.routeRepository.update(id, updateRouteDto);
//     return this.findOne(id);
//   }

//   async remove(id: number): Promise<void> {
//     await this.routeRepository.delete(id);
//   }
// }
@Injectable()
export class RoutesService{
  constructor(@InjectRepository(Route) private routesRepo:Repository<Route>,){}
  async findOne(id:number){
    const route = await this.routesRepo.findOne({
        where: {
            id,
        },
    });
    if(!route) throw new NotFoundException();
    return route;
}
  async findAll(){
    return await this.routesRepo.find();
}
  async create(dto:CreateRouteDto){
   return await this.routesRepo.save(dto)
  }
  async update(id:number,dto:UpdateRouteDto){
    return await this.routesRepo.update({id},dto)
}
async delete(id:number){
  return await this.routesRepo.delete({id},)
}
  
}