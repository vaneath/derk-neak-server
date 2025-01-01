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

  @Column({ type: 'timestamp' })
  departureTime: Date;

  @Column({ type: 'timestamp' })
  arrivalTime: Date;
}
