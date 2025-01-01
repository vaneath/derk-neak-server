import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRouteDto {
  @IsNotEmpty()
  @IsString()
  source: string;

  @IsNotEmpty()
  @IsString()
  destination: string;

  @IsOptional()
  @IsBoolean()
  isAvailable: boolean;
}
