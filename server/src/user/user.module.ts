import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { CustomersService } from './services/customers/customers.service';
import { UsersController } from './controllers/user/user.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { ProductModule } from '../product/product.module';

@Module({
  providers: [UsersService, CustomersService],
  controllers: [UsersController, CustomerController],
  imports: [ProductModule]
})
export class UserModule {}
