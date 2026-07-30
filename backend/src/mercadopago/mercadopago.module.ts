import { Module } from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';
import { MercadopagoController } from './mercadopago.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CartService } from '../cart/cart.service';

@Module({
  imports: [PrismaModule],
  controllers: [MercadopagoController],
  providers: [MercadopagoService, CartService],
})
export class MercadopagoModule {}
