import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async createCart(userId: number) {
    try {
      const findCart = await this.prisma.cart.findFirst({
        where: { userId: userId },
      });

      let cartItem = findCart;

      if (!findCart) {
        cartItem = await this.prisma.cart.create({
          data: {
            userId: userId,
            total: 0,
          },
        });
      }
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async createCartItem(userId: number, productId: number, quantity: number) {
    try {
      const findCart = await this.prisma.cart.findFirst({
        where: { userId: userId },
      });

      if (!findCart) {
        await this.prisma.cart.create({
          data: {
            userId: userId,
            total: 0,
          },
        });
      }

      const findProduct = await this.prisma.product.findUnique({
        where: { id: productId },
      });

      if (!findProduct) {
        throw new NotFoundException();
      }

      if (
        findProduct?.stock <= 0 ||
        quantity > findProduct?.stock ||
        quantity <= 0
      ) {
        throw new BadRequestException();
      }

      const newCartItem = await this.prisma.cartItem.create({
        data: {
          productId: productId,
          cart_id: Number(findCart?.id),
          quantity: quantity,
        },
      });

      await this.prisma.cart.update({
        where: { id: findCart?.id },
        data: {
          //@ts-ignore
          total: findCart.total + findProduct.price * newCartItem.quantity,
        },
      });

      await this.prisma.product.update({
        where: { id: productId },
        data: {
          stock: findProduct.stock - quantity,
        },
      });

      return newCartItem;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async GetCart(userId: number) {
    try {
      const findCart = await this.prisma.cart.findFirst({
        where: { userId: userId },
      });

      if (!findCart) {
        throw new NotFoundException();
      }

      const findCartItems = await this.prisma.cartItem.findMany({
        where: { cart_id: findCart.id },
      });

      return findCartItems;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async DeleteCartItem(cartItemId: number) {
    try {
      const findCartItem = await this.prisma.cartItem.findFirst({
        where: { id: cartItemId },
      });

      if (!findCartItem) {
        throw new NotFoundException();
      }

      const findCart = await this.prisma.cart.findFirst({
        where: { id: findCartItem?.cart_id },
      });

      if (!findCart) {
        throw new NotFoundException();
      }

      await this.prisma.cartItem.delete({
        where: { id: cartItemId },
      });

      const newStockProduct = await this.prisma.product.findFirst({
        where: { id: findCartItem.productId },
      });

      if (!newStockProduct) {
        throw new NotFoundException();
      }

      await this.prisma.cart.update({
        where: { id: findCartItem.cart_id },
        data: {
          total: findCart?.total - newStockProduct.price,
        },
      });

      await this.prisma.product.update({
        where: { id: newStockProduct?.id },
        data: {
          stock: findCartItem?.quantity + newStockProduct.stock,
        },
      });
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async Deletecart(userId: number) {
    try {
      const findCart = await this.prisma.cart.findFirst({
        where: { userId: userId },
      });

      if (!findCart) {
        throw new NotFoundException();
      }

      const findItems = await this.prisma.cartItem.findMany({
        where: { cart_id: findCart.id },
      });

      for (let i = 0; i < findItems.length; i++) {
        const product = await this.prisma.product.findUnique({
          where: { id: Number(findItems[i].productId) },
        });

        if (!product) {
          throw new NotFoundException();
        }

        await this.prisma.product.update({
          where: { id: findItems[i].productId },
          data: {
            stock: product.stock + findItems[i].quantity,
          },
        });
      }

      await this.prisma.cartItem.deleteMany({
        where: { cart_id: Number(findCart.id) },
      });

      return await this.prisma.cart.delete({
        where: { id: findCart.id },
      });
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
