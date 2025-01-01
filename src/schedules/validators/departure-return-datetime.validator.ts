import { BadRequestException } from '@nestjs/common';

export function validateDepartureAndReturnDateTime(
  departureDate: string,
  departureTime: string,
  returnDate: string,
  returnTime: string,
) {
  const departureDateTime = new Date(`${departureDate}T${departureTime}`);
  const returnDateTime = new Date(`${returnDate}T${returnTime}`);

  if (returnDateTime < departureDateTime) {
    throw new BadRequestException(
      'Return date and time must be after departure date and time',
    );
  }

  if (departureDate === returnDate && returnTime <= departureTime) {
    throw new BadRequestException(
      'Return time must be after departure time when the dates are the same',
    );
  }
}
