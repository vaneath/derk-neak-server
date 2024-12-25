import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as argon2 from 'argon2';
import { Role } from 'src/auth/enums/role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  firstName: string;

  @Column({ type: 'varchar', length: 30 })
  lastName: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  hashedRefreshToken: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
