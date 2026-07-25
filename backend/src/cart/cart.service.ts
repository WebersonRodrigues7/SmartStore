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
      console.log(err);
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
      const findCart = await this.prisma.cartItem.findFirst({
        where: { id: cartItemId },
      });

      if (!findCart) {
        throw new NotFoundException();
      }

      await this.prisma.cartItem.delete({
        where: { id: cartItemId },
      });

      const newStockProduct = await this.prisma.product.findFirst({
        where: { id: findCart.productId },
      });

      if (!newStockProduct) {
        throw new NotFoundException();
      }

      await this.prisma.product.update({
        where: { id: newStockProduct?.id },
        data: {
          stock: findCart.quantity + newStockProduct.stock,
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

      for (let i; i < findItems.length; i++) {
        const product = await this.prisma.product.findUnique({
          where: { id: Number(findItems[i].productId) },
        });
        await this.prisma.product.updateMany({
          where: { id: Number(findItems[i].productId) },
          data: {
            stock: Number(product?.stock) + Number(findItems[i].quantity),
          },
        });
      }

      await this.prisma.cartItem.deleteMany({
        where: { cart_id: Number(findCart.id) },
      });

      await this.prisma.cart.delete({
        where: { id: findCart.id },
      });
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
