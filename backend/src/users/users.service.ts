import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDTO } from './DTO/users.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findUser(userid: number) {
    const finduser = await this.prisma.user.findUnique({
      where: { id: Number(userid) },
    });

    if (!finduser) throw new NotFoundException();

    return finduser;
  }
  async createUser(body: UserDTO) {
    try {
      const hashPass = await bcrypt.hash(body.password, 10);
      const newUser = await this.prisma.user.create({
        data: {
          nome: body.name,
          email: body.email,
          password: hashPass,
        },
      });
      return newUser;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async updateUser(userid: number, body: UserDTO) {
    try {
      const findUser = await this.prisma.user.findUnique({
        where: { id: Number(userid) },
      });

      if (!findUser) {
        throw new NotFoundException();
      }
      const hashPass = await bcrypt.hash(body.password, 10);
      const updtUser = await this.prisma.user.update({
        where: { id: Number(findUser.id) },
        data: {
          name: body.name,
          email: body.email,
          password: hashPass,
        },
      });

      return updtUser;
    } catch (err) {
      console.log(err);
    }
  }
}
