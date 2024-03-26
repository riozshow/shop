import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Roles } from '@prisma/client';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.user && request.user.role === Roles.ADMIN;
  }
}
