import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('routes')
export class Route {
  @PrimaryGeneratedColumn()
    id:number
    @Column()
    source:string
    @Column()
    destination: string
    @Column({default:0})
    distance:number
  


}
