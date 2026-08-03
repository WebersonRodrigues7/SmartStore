import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('mercadopago')
export class MercadopagoController {
  constructor(private readonly mercadopagoService: MercadopagoService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':orderId')
  async CreatePayment(@Req() req, @Param('orderId') orderId: number) {
    return await this.mercadopagoService.createPayment(
      req.user.id,
      Number(orderId),
    );
  }

  @Post('/v1/webhook')
  async WebHook(@Req() req) {
    const paymentCheck = await this.mercadopagoService.consultPayment(req.body.data.id)

    return paymentCheck;
  }
}
