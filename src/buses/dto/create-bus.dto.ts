import { IsInt, IsNotEmpty, IsString, Min, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ColumnRowConfig {
  @IsString()
  column: string;

  @IsInt()
  @Min(1)
  rows: number;
}

export class CreateBusDto {
  @IsString()
  @IsNotEmpty()
  busNumber: string;

  @IsString()
  @IsNotEmpty()
  busPlate: string;

  @IsString()
  @IsNotEmpty()
  busDriver: string;

  @IsInt()
  @Min(1)
  capacity: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ColumnRowConfig)
  lowerDeckConfig: ColumnRowConfig[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ColumnRowConfig)
  upperDeckConfig: ColumnRowConfig[];
}
