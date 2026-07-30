import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';
import { ProductsModule } from './products/products.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CartModule } from './cart/cart.module';
import { MercadopagoModule } from './mercadopago/mercadopago.module';
import { OrdersModule } from './orders/orders.module';
import { TesteModule } from './teste/teste.module';


@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        limit: 100,
        ttl: 60000,
      },
    ]),
    UsersModule,
    LoginModule,
    ProductsModule,
    CartModule,
    MercadopagoModule,
    OrdersModule,
    TesteModule,
    
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppService,
  ],
})
export class AppModule {}
