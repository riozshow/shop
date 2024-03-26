import {
  Controller,
  Post,
  Delete,
  Body,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/Register.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthenticatedGuard } from './authenticated.guard';
import { AdminGuard } from './admin.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDTO) {
    return this.authService.register(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('logout')
  async logout(@Request() req) {
    await req.session.destroy();
    return { message: 'You have been successfully logged out' };
  }

  @UseGuards(AdminGuard)
  @Get('admin')
  admin() {}
}
