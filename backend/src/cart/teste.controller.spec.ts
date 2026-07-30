import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PrismaModule } from '../prisma/prisma.module';

//cria o grupo de teste
describe('CartController', () => {
  //instancia o controller fora do beforeach para todos os testes acessar
  let controller: CartController;
  const cartService = {
    getCart: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        {
          provide: CartService,
          useValue: cartService,
        },
      ],
      imports: [PrismaModule],
    }).compile();

    controller = module.get(CartController);
  });

  it('Deve criar um carrinho', async () => {
    cartService.getCart.mockResolvedValue([{ id: 1, quantity: 2 }]);

    const result = await controller.getCart(2);

    expect(cartService.getCart).toHaveBeenCalledWith(2);
    expect(result).toEqual([{ id: 1, quantity: 2 }]);
  });
});
