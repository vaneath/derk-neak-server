import { Schedule } from 'src/schedules/entities/schedule.entity';
import { Seat } from 'src/seats/entities/seat.entity';
import { User } from 'src/users/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Seat)
  @JoinColumn()
  seat: Seat;

  @ManyToOne(() => User, (user) => user.tickets)
  user: User;

  @ManyToOne(() => Schedule, (schedule) => schedule.tickets)
  schedule: Schedule;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
