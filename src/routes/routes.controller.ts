import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/createRoute.dto';
import { UpdateRouteDto } from './dto/updateRoute.dto';
import { ParseIdPipe } from './pipes/parseIdPipes';


@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}
//Done Post
  @Post()
  create(@Body() dto: CreateRouteDto) {
    return this.routesService.create(dto);
  }

  @Get()
  findAll(){
      //return "All Properties";
      return this.routesService.findAll();
  }

  @Get(":id")
    
    findOne(@Param('id', ParseIntPipe)id//,@Query('sort', ParseBoolPipe)sort
){
        // console.log(typeof id);
        // console.log(typeof sort);
        // return id;
        return this.routesService.findOne(id);
    }

    @Patch(':id')
    
    update(
    
        @Param('id', ParseIdPipe)id
        // {id} : IdParamDto
        ,
        @Body(
//             new ValidationPipe({
//         whitelist: true,
//         forbidNonWhitelisted: true,
//         groups:['update'],
//         always: true, // to accept the uneccessary data

//    }),
        

) body:UpdateRouteDto,
//@Headers("host")header : HeadersDto,
// to load only host
//@RequestHeader(new ValidationPipe({whitelist:true,validateCustomDecorators:true})) header : HeadersDto,
//whitelist:true, for the whole detail
){
    
 //return header;
 return this.routesService.update(id,body);
}

@Delete(':id')
delete (@Param('id',ParseIdPipe)id){
    return this.routesService.delete(id);
}

}
