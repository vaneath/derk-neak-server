import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('buses')
export class Bus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bus_number: string;

  @Column()
  bus_plate: string;

  @Column()
  bus_driver: string;

  @Column()
  capacity: number;
}
