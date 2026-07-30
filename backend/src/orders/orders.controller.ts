import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createOrder(@Req() req) {
    const newOrder = await this.ordersService.createOrder(req.user.id);

    return newOrder;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getOrder(@Req() req) {
    const findOrder = await this.ordersService.getOrder(req.user.id);

    return findOrder;
  }
}
