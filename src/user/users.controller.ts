import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('users')
export class UsersController {
  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  getProfile(@Session() session) {
    const user: User = session.passport.user;
    if (user) {
      return user;
    } else {
      return { message: 'You are not logged in' };
    }
  }
}
