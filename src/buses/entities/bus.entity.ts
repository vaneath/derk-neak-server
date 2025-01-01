import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
