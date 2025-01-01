import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SeatStatus } from '../enums/seat-status.enum';
import { SeatDeck } from '../enums/seat-deck.enum';
import { Bus } from 'src/buses/entities/bus.entity';

@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seatNumber: string;

  @Column({ type: 'enum', enum: SeatStatus, default: SeatStatus.AVAILABLE })
  status: SeatStatus;

  @Column({ type: 'enum', enum: SeatDeck, default: SeatDeck.LOWER })
  deck: SeatDeck;

  @ManyToOne(() => Bus, (bus) => bus.seats)
  bus: Bus;
}
