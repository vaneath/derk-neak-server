import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Seat } from 'src/seats/entities/seat.entity';

@Entity('buses')
export class Bus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  busNumber: string;

  @Column()
  busPlate: string;

  @Column()
  busDriver: string;

  @Column()
  capacity: number;

  @OneToMany(() => Seat, (seat) => seat.bus, { eager: true })
  seats: Seat[];
}
