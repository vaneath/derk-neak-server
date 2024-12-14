import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, plainPassword: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(
        'Invalid email or password. Please try again.',
      );
    }

    const isPasswordValid = await compare(plainPassword, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Invalid email or password. Please try again.',
      );
    }

    const { password, ...result } = user;

    return result;
  }
}
