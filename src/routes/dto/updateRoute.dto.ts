import { PartialType } from '@nestjs/mapped-types';
import { CreateRouteDto } from './createRoute.dto';

export class UpdateRouteDto extends PartialType(CreateRouteDto) {
    source?: string;
    destination?: string;
    distance?: number;
}

  