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

  @Post('/cartItem')
  async createCartItem(@Req() req, productId: number, quantity: number) {
    return await this.cartService.createCartItem(req.user.id, productId, quantity);
    
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/item/:id')
  async deleteCartItem(@Param('id', ParseIntPipe) cartItemId: number) {
    return await this.cartService.DeleteCartItem(cartItemId);
  }

  @Delete()
  async deleteCart(@Req() req) {
    return await this.cartService.Deletecart(req.user.id);
  }
}
