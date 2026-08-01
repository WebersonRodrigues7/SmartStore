import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { STATUS } from '../generated/prisma/enums';

interface PropsItems {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
}

@Injectable()
export class MercadopagoService {
  constructor(private readonly prisma: PrismaService) {}

  async createPayment(userId: number, orderId: number) {
    const client = new MercadoPagoConfig({
      accessToken: String(process.env.ACCESSTOKEN),
    });

    const preference = new Preference(client);

    const getOrders = await this.prisma.orders.findFirst({
      where: { id: orderId, userId: userId },
    });

    if (!getOrders) {
      throw new NotFoundException();
    }

    const orderItems = await this.prisma.orderItem.findMany({
      where: { orderId: orderId },
    });

    // criando o array pra salvar todos os items q vem do carrinho e tipando
    const items: PropsItems[] = [];

    // para cada item do carrinho
    for (const orderItem of orderItems) {
      const getProduct = await this.prisma.product.findUnique({
        where: { id: orderItem.productId },
      });

      if (!getProduct) {
        throw new NotFoundException();
      }

      // colando o item na lista um por um
      items.push({
        id: String(orderItem.id),
        title: `${orderItem.quantity} ${getProduct.name}`,
        quantity: orderItem.quantity,
        unit_price: Number(getProduct.price),
      });
    }

    //criando o pedido com todos os items
    return preference.create({
      body: {
        items,

        notification_url: '',
        back_urls: {
          success: 'https://instagram.com',
          failure: 'https://instagram.com',
          pending: 'https://instagram.com',
        },

        // adicionando referencia para o mercadopago
        external_reference: String(getOrders.id),
        auto_return: 'approved',
      },
    });
  }

  async consultPayment(paymentId: number) {
    const mercadoPagoConfig = new MercadoPagoConfig({
      accessToken: String(process.env.ACCESSTOKEN),
    });
    const paymentClient = new Payment(mercadoPagoConfig);

    const payment = await paymentClient.get({
      id: paymentId,
    });

    await this.prisma.orders.update({
      where: { id: Number(payment.external_reference) },
      data: {
        status:
          payment.status === 'approved' ? STATUS.APPROVED : STATUS.CANCELLED,
      },
    });

    return payment;
  }
}
