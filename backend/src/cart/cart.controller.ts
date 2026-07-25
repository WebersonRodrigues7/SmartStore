import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/cart.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createCart(@Req() req) {
    return await this.cartService.createCart(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getCart(@Req() req) {
    return await this.cartService.GetCart(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/cartItem')
  async createCartItem(@Req() req, @Body() body: CreateCartDto) {
    return await this.cartService.createCartItem(
      req.user.id,
      body.productId,
      body.quantity,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/item/:id')
  async deleteCartItem(@Param('id', ParseIntPipe) cartItemId: number) {
    return await this.cartService.DeleteCartItem(cartItemId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteCart(@Req() req) {
    return await this.cartService.Deletecart(req.user.id);
  }
}
