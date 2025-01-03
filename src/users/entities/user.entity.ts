import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as argon2 from 'argon2';
import { Role } from 'src/auth/enums/role.enum';
import { Ticket } from 'src/tickets/entities/ticket.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  firstName: string;

  @Column({ type: 'varchar', length: 30 })
  lastName: string;

  @Column({ nullable: true })
  profileImageUrl: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  hashedRefreshToken: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
