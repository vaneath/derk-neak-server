import { Bus } from 'src/buses/entities/bus.entity';
import { Route } from 'src/routes/entities/route.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Bus)
  bus: Bus;

  @ManyToOne(() => Route)
  route: Route;

  @Column({ type: 'date' })
  departureDate: Date;

  @Column({ type: 'time' })
  departureTime: string;

  @Column({ type: 'date', nullable: true })
  returnDate: Date;

  @Column({ type: 'time', nullable: true })
  returnTime: string;

  @Column({ nullable: true })
  tripDuration: string;

  @Column({ type: 'boolean', default: false })
  isRoundTrip: boolean;
}
