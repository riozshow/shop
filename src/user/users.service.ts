import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Password, User } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { CreateUserDTO } from './dto/CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  async getById(id: User['id']): Promise<User> {
    const user = await this.db.user.findUnique({ where: { id } });
    if (user) return user;
    throw new NotFoundException('User not found');
  }

  async getByEmail(
    email: User['email'],
  ): Promise<User & { Password: Password }> {
    const user = await this.db.user.findUnique({
      where: { email },
      include: { Password: true },
    });
    if (user) return user;
    throw new NotFoundException('User not found');
  }

  async create(userData: CreateUserDTO): Promise<User> {
    try {
      const { hashedPassword, type, ...userDetails } = userData;
      const user = await this.db.user.create({
        data: {
          ...userDetails,
          ...(type ? { role: 'ADMIN' } : { role: 'USER' }),
          Password: { create: { hashedPassword } },
        },
      });
      return user;
    } catch (err) {
      if (err.code === 'P2002')
        throw new BadRequestException('This email is already taken');
    }
  }
}
