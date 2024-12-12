import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepo.create(createUserDto);

    return await this.usersRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepo.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepo.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepo.findOne({
      where: {
        email,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepo.update(id, updateUserDto);
  }

  async remove(id: number) {
    return this.usersRepo.delete(id);
  }
}
