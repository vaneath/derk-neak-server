import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateBusDto {
  busNumber: string;

  @IsNotEmpty()
  @IsString()
  busPlate: string;

  @IsNotEmpty()
  @IsString()
  busDriver: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  capacity: number;
}
