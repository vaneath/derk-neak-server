import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';

export class CreateScheduleDto {
  @IsNotEmpty()
  busId: number;

  @IsNotEmpty()
  routeId: number;

  @IsNotEmpty()
  departureDate: string;

  @IsNotEmpty()
  departureTime: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isRoundTrip: boolean;

  @ValidateIf((o) => o.isRoundTrip === true)
  @IsNotEmpty()
  returnDate?: string; // Format: YYYY-MM-DD

  @ValidateIf((o) => o.isRoundTrip === true)
  @IsNotEmpty()
  returnTime?: string;
}
