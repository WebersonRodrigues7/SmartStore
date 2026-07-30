import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(userId: number) {
    return await this.prisma.$transaction(async (tx) => {
      const findCart = await tx.cart.findFirst({
        where: { userId: userId },
        include: {
          cartItem: true,
        },
      });

      if (!findCart) {
        throw new NotFoundException();
      }

      if (findCart.cartItem.length === 0) {
        throw new BadRequestException('Carrinho vazio');
      }

      const newOrder = await tx.orders.create({
        data: {
          total: findCart.total,
          userId: userId,
        },
      });

      for (let i = 0; i < findCart.cartItem.length; i++) {
        const item = findCart.cartItem[i];
        await tx.orderItem.create({
          data: {
            quantity: item.quantity,
            productId: item.productId,
            orderId: newOrder.id,
          },
        });
      }

      return newOrder;
    });
  }

  async getOrder(userId: number) {
    const getOrder = await this.prisma.orders.findMany({
      where: { userId: userId },
    });

    if (getOrder.length === 0) {
      throw new NotFoundException();
    }

    return getOrder;
  }
}
