import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDTO } from '../users/DTO/users.dto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) {}

  async Login(body: UserDTO) {
    try {
      const findUser = await this.prisma.user.findFirst({
        where: { email: body.email },
      });
      const comparePass = await bcrypt.compare(
        body.password,
        findUser?.password as string,
      );
      const secretKey = process.env.JWT_SECRET;

      if (!findUser) {
        throw new NotFoundException();
      }

      if (comparePass === true && findUser.email === body.email) {
        const token = jwt.sign(
          { id: findUser.id, email: findUser.email },
          String(secretKey),
          {
            expiresIn: '1h',
          },
        );

        return { token: token };
      } else {
        throw new NotFoundException();
      }
    } catch (err) {
      throw new NotFoundException('Usuário e/ou senha errado(s)!');
    }
  }
}
