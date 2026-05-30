import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';
import { ProductDTO } from './DTO/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    const getallProducts = await this.productsService.getProducts();

    return getallProducts;
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  async createNewProduct(@Req() req, @Body() body: ProductDTO) {
    const newproduct = await this.productsService.createProduct(
      req.user.id,
      body,
    );

    return newproduct;
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async updtProduct(
    @Param('id') id: number,
    @Req() req,
    @Body() body: ProductDTO,
  ) {
    const updtproduct = await this.productsService.updateProduct(
      req.user.id,
      id,
      body,
    );

    return updtproduct;
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteProd(@Param(':id') id: number, @Req() req) {
    const deletedProduct = this.productsService.deleteProduct(req.user.id, id);

    return deletedProduct;
  }
}
