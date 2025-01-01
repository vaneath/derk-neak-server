import { Injectable } from '@nestjs/common';
import { Seat } from '../entities/seat.entity';
import { SeatDeck } from '../enums/seat-deck.enum';
import { Bus } from 'src/buses/entities/bus.entity';

@Injectable()
export class SeatGenerator {
  private generateDeckSeats(
    bus: Bus,
    deck: SeatDeck,
    config: { column: string; rows: number }[],
  ): Seat[] {
    const seats: Seat[] = [];
    for (const { column, rows } of config) {
      for (let row = 1; row <= rows; row++) {
        const seat = new Seat();
        seat.bus = bus;
        seat.deck = deck;
        seat.seatNumber = `${column}${row}`;
        seats.push(seat);
      }
    }
    return seats;
  }

  generateSeats(
    bus: Bus,
    lowerDeckConfig: { column: string; rows: number }[],
    upperDeckConfig: { column: string; rows: number }[],
  ): Seat[] {
    return [
      ...this.generateDeckSeats(bus, SeatDeck.LOWER, lowerDeckConfig),
      ...this.generateDeckSeats(bus, SeatDeck.UPPER, upperDeckConfig),
    ];
  }
}
