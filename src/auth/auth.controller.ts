import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { Public } from './decorators/public.decorator';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { Role } from './enums/role.enum';
import { Roles } from './decorators/roles.decorator';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UsersService,
  ) {}

  @Public()
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const payload = await this.authService.login(req.user.id);

    return payload;
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    const refreshToken = await this.authService.refreshToken(
      req.user as AuthJwtPayload,
    );

    return refreshToken;
  }

  @HttpCode(204)
  @Post('logout')
  async logout(@Request() req) {
    await this.authService.logout(req.user.id);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  async googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleLoginCallback(@Req() req, @Res() res) {
    const response = await this.authService.login(req.user);

    res.redirect(`http://localhost:5173?token=${response.access_token}`);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Post('impersonate')
  async impersonate(@Body() body) {
    const email = body.email;
    const user = await this.userService.findByEmail(email);

    const { access_token, refresh_token } = await this.authService.login(
      user.id,
    );

    return {
      id: user.id,
      email,
      access_token,
      refresh_token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    const userId = req.user.id;
    return this.authService.getProfile(userId);
  }
}
