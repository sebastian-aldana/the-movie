import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, userPassword: string) {
    const user = await this.userService.findUserByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(userPassword, user.password);
      const { password, ...rta } = user.toJSON();
      if (isMatch) {
        return rta;
      }
      return null;
    }
    return null;
  }

  generateJWT(user: User) {
    const payload = { sub: user.email };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
