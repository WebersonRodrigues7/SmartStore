import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDTO } from './DTO/product.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async createProduct(id: number, body: ProductDTO) {
    const findUser = await this.usersService.findUser(Number(id));

    if (findUser.role === 'ADMIN') {
      const newProduct = await this.prisma.product.create({
        data: {
          name: body.name,
          mark: body.mark,
          price: Number(body.price),
          description: body.description,
          stock: Number(body.stock),
        },
      });

      return newProduct;
    } else {
      throw new UnauthorizedException();
    }
  }

  async getProducts() {
    const products = await this.prisma.product.findMany();

    return products;
  }

  async getApple() {
    const findApple = await this.prisma.product.findMany({
      where: { mark: 'Apple' },
    });

    if (!findApple) {
      throw new NotFoundException();
    }

    return findApple;
  }

  async deleteProduct(userId: number, id: number) {
    const findUser = await this.usersService.findUser(userId);
    if (findUser.role === 'ADMIN') {
      const findProduct = await this.prisma.product.findUnique({
        where: { id: Number(id) },
      });

      if (!findProduct) throw new NotFoundException();

      const delProduct = await this.prisma.product.delete({
        where: { id: Number(findProduct.id) },
      });

      return delProduct;
    } else {
      throw new UnauthorizedException();
    }
  }

  async updateProduct(userId: number, id: number, body: ProductDTO) {
    const findUser = await this.usersService.findUser(userId);

    if (findUser.role === 'ADMIN') {
      const updtProduct = await this.prisma.product.update({
        where: { id: Number(id) },
        data: {
          name: body.name,
          mark: body.mark,
          price: body.price,
          description: body.description,
          stock: body.stock,
        },
      });

      return updtProduct;
    } else {
      throw new UnauthorizedException();
    }
  }
}
