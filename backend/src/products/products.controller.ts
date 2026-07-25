    import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';
import { ProductDTO } from './DTO/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/apple')
  async getAllApple() {
    const findApple = await this.productsService.getApple();

    return findApple;
  }

  @Get()
  async getAllProducts() {
    const getallProducts = await this.productsService.getProducts();

    return getallProducts;
  }

  @Post('/')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, cb) => {
          const fileName = `${Date.now()}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  @UseGuards(AuthGuard('jwt'))
  async createNewProduct(
    @Req() req,
    @Body() body: ProductDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Imagem obrigatória');
    }
    return await this.productsService.createProduct(req.user.id, {
      ...body,
      img: `uploads/products/${file.filename}`,
    });
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
  async deleteProd(@Param('id') id: number, @Req() req) {
    const deletedProduct = this.productsService.deleteProduct(req.user.id, id);

    return deletedProduct;
  }
}
