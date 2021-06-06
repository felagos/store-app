import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { CustomersService } from './services/customers/customers.service';
import { UsersController } from './controllers/user/user.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { ProductModule } from '../product/product.module';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from './repository/customer.repository';
import { OrdersService } from './services/orders/orders.service';
import { OrdersController } from './controllers/orders/orders.controller';
import { OrderItemController } from './controllers/order-item/order-item.controller';
import { OrderItemService } from './services/order-item/order-item.service';

@Module({
  providers: [UsersService, CustomersService, OrdersService, OrderItemService],
  controllers: [UsersController, CustomerController, OrdersController, OrderItemController],
  imports: [
    ProductModule,
    TypeOrmModule.forFeature([UserRepository, CustomerRepository])
  ]
})
export class UserModule {}
