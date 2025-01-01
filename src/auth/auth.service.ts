import {
  Body,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import * as argon2 from 'argon2';
import { CurrentUser } from './types/current-user';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshJwtConfig,
  ) {}

  async login(userId: number) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);

    const hashedRefreshToken = await argon2.hash(refreshToken);

    await this.usersService.updateRefreshToken(userId, hashedRefreshToken);

    return {
      id: userId,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async logout(userId: number) {
    return this.usersService.updateRefreshToken(userId, null);
  }

  async generateTokens(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(
        payload,
        this.refreshJwtConfig as ConfigType<typeof refreshJwtConfig>,
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(user: AuthJwtPayload) {
    const payload: AuthJwtPayload = { sub: user.sub };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(
      payload,
      this.refreshJwtConfig as ConfigType<typeof refreshJwtConfig>,
    );

    return {
      id: user.sub,
      access_token: token,
      refresh_token: refreshToken,
    };
  }

  async validateUser(email: string, plainPassword: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(
        'Invalid email or password. Please try again.',
      );
    }

    const isPasswordValid = await argon2.verify(user.password, plainPassword);

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Invalid email or password. Please try again.',
      );
    }

    const { password, ...result } = user;

    return result;
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    try {
      const user = await this.usersService.findOne(userId);

      if (!user || !user.hashedRefreshToken) {
        throw new UnauthorizedException('Invalid Refresh Token');
      }

      const isRefreshTokenValid = await argon2.verify(
        user.hashedRefreshToken,
        refreshToken,
      );

      if (!isRefreshTokenValid) {
        throw new UnauthorizedException('Invalid Refresh Token');
      }

      return user.id;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async validateJwtUser(userId: number) {
    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const currentUser: CurrentUser = { ...user };

    return currentUser;
  }

  async validateGoogleUser(googleUser: CreateUserDto) {
    const user = await this.usersService.findByEmail(googleUser.email);

    if (!user) {
      const newUser = await this.usersService.create(googleUser);

      return newUser;
    }

    return user;
  }

  async impersonate(@Body() body) {
    const email = body.email;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    this.generateTokens(user.id);

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      access_token: this.generateTokens(user.id),
      refresh_token: this.generateTokens(user.id),
    };
  }

  async getProfile(userId: number): Promise<CurrentUser> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const { password, hashedRefreshToken, ...profile } = user;
    return profile;
  }
}
