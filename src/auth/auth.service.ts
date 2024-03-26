import { Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/Register.dto';
import { LoginDTO } from './dto/Login.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(body: RegisterDTO): Promise<User> {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    delete body.password;
    delete body.passwordRepeat;
    return this.usersService.create({ ...body, hashedPassword });
  }

  async login(body: LoginDTO) {
    const { email, password } = body;
    const user = await this.usersService.getByEmail(email);
    if (!user) return;
    if (await bcrypt.compare(password, user.Password.hashedPassword)) {
      const { Password, ...userData } = user;

      return userData;
    }
  }

  async logout(userId: User['id']) {}
}
